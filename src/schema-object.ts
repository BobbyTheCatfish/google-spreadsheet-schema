import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, ObjectSchemaField, TypeMap, valueMapper } from "./utils";


export type ObjectSchemaBuilder = {
    [field: string]: ObjectSchemaField<keyof TypeMap>;
};

type OptionalNull<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["possiblyNull"] extends true ? T[K]["defaultValue"] extends null ? null : never : never

type DefaultFieldType<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["type"] extends undefined ? string : TypeMap[Exclude<T[K]["type"], undefined>]

type FieldType<T extends ObjectSchemaBuilder, K extends keyof T> = TypeMap[DefaultType<TypeMap, T[K]["type"], "string">]

type ParsedRow<T extends ObjectSchemaBuilder> = {
    [K in keyof T]: (T[K]["type"] extends ("stringSet" | "numSet") ? FieldType<T, K> : T[K]["splitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>) | OptionalNull<T, K>;
};


/**
 * A standard object based schema. Maps row to objects with keys and values of a given type.
 */
export default class ObjectSchema<T extends ObjectSchemaBuilder, K extends keyof T> extends Collection<DefaultFieldType<T, K>, ParsedRow<T>> {
    schema: T
    rows: GoogleSpreadsheetRow[]
    primaryKey: K
    sheet: GoogleSpreadsheetWorksheet | null

    /**
     * Creates an object based schema.
     * @param primaryKey The column name to use as the collection key
     * @param schema A schema to build row objects
     */
    constructor(primaryKey: K, schema: T) {
        super();
        this.sheet = null;
        this.schema = schema;
        this.primaryKey = primaryKey;
        this.rows = []
    }
  
    /**
     * Loads and populates data from the sheet
     * @param sheet The Google Sheets Worksheet to load data from
     * @param filter A function to determine which rows should be included
     * @param rows  Pre-fetched rows. If not provided, this method will call `sheet.getRows()`
     */
    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = () => true, rows?: GoogleSpreadsheetRow[]) {
        if (rows) this.rows = rows
        else this.rows = await sheet.getRows();
        
        this.sheet = sheet;
        const key = this.schema[this.primaryKey]
        if (!key.type) key.type = "string";

        this.clear()
        for (const row of this.rows) {
            const primaryKey = row.get(key.key)
            if (primaryKey && filter(row)) {
                this.set(valueMapper(primaryKey, { key: primaryKey, type: key.type }) as any, this.parseRow(row))
            }
        }
    }

    private isBlank(v: any) {
        return ["", undefined, null].includes(v)
    }

    parseRow(row: GoogleSpreadsheetRow): ParsedRow<T> {
        const result: any = {};
        for (const field in this.schema) {
            const f = this.schema[field]
            if (!f.type) f.type = "string"

            let type = f.type;
            if (type === "numSet") type = "number"
            else if (type === "stringSet") type = "string"

            let value = row.get(f.key);
            
            if (f.splitter) {
                const newValues = []
                for (const v of value?.split(f.splitter) ?? []) {
                    if (this.isBlank(v)) continue;
                    const newVal = valueMapper(v, { ...f, type });
                    if (newVal !== null) newValues.push(newVal);
                }
                value = f.type.endsWith("Set") ? new Set(newValues) : newValues;
            } else if (!f.type.endsWith("Set")) {
                value = valueMapper(value, f) ?? f.defaultValue ?? null;
                if (value === null && !f.possiblyNull) throw new Error(`Value for \`${field}\` on row ${row.rowNumber} was null when not expected`);
            } else {
                throw new Error(`Expected property splitter for field ${f.key}`)
            }
 
            result[field] = value;
        }
        return result;
    }

    private reverseParseRow(row: ParsedRow<T>) {
        const newRecord: Record<string, string> = {};
        for (const field in row) {
            const value = row[field]
            const schemaProp = this.schema[field];
            if (!schemaProp || !value) continue;
            switch(schemaProp.type) {
                case "number": {
                    newRecord[schemaProp.key] = value.toString()
                }
                case "numSet": {
                    const joined = Array.from(value as Set<number>).join(schemaProp.splitter ?? " ") || schemaProp.defaultValue?.toString() || ""
                    newRecord[schemaProp.key] = joined;
                }
                case "boolean": {
                    newRecord[schemaProp.key] = value === true ? "TRUE" : "FALSE"
                }
                case "string": {
                    newRecord[schemaProp.key] = value.toString()
                }
                case "stringSet": {
                    const joined = Array.from(value as Set<string>).join(schemaProp.splitter ?? " ") || schemaProp.defaultValue?.toString() || ""
                    newRecord[schemaProp.key] = joined;
                }
                case "date": {
                    newRecord[schemaProp.key] = (value as Date).valueOf().toString()
                }
            }
        }
        return newRecord
    }

    private updateOne(row: ParsedRow<T>) {
        const pkey = this.schema[this.primaryKey]
        if (!pkey.type) pkey.type = "string";
        const key = valueMapper(row[this.primaryKey], { key: pkey.key, type: pkey.type }) as any
        const parsed = this.reverseParseRow(row)        

        const found = this.rows.find(r => r.get(pkey.key) === String(row[this.primaryKey]))
        this.set(key, row);

        if (found) {
            found.assign(parsed)
            return { found, key, row }
        } else {
            return { key, row, parsed }
        }
    }
    /**
     * Saves a new or updated row
     * 
     * Calls ObjectSchema.set() and either GoogleSpreadsheetWorksheet.addRow() or .assign() and .save()
     * @param row The new or updated row
     */
    async update(row: ParsedRow<T> | ParsedRow<T>[]) {
        if (!this.sheet) throw new Error(`No sheet set for schema with key ${String(this.primaryKey)}`);

        if (Array.isArray(row)) {
            const updates = row.map(r => this.updateOne(r));
            const newRows = updates.filter(u => u.parsed);
            const inserted = await this.sheet.addRows(newRows.map(r => r.parsed!))

            const updated = updates.filter(u => u.found);
            await Promise.all(updated.map(u => u.found!.save()))

            for (const r of inserted) {
                this.rows.push(r)
            }

        } else {
            const r = this.updateOne(row);
            if (r.found) {
                await r.found.save()
            } else {
                this.rows.push(await this.sheet.addRow(r.parsed));
            }
        }
        return this
    }
}