import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, ObjectSchemaField, TypeMap, valueMapper } from "./utils";


export type ObjectSchemaBuilder = {
    [field: string]: ObjectSchemaField<keyof TypeMap>;
};

type OptionalNull<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["possiblyNull"] extends true ? T[K]["defaultValue"] extends null ? null : never : never

type DefaultFieldType<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["type"] extends undefined ? TypeMap["string"] : TypeMap[Exclude<T[K]["type"], undefined>]
type FieldType<T extends ObjectSchemaBuilder, K extends keyof T> = DefaultFieldType<T, K>

type ParsedRow<T extends ObjectSchemaBuilder> = {
    [K in keyof T]: (T[K]["arraySplitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>) | OptionalNull<T, K>;
};

export default class ObjectSchema<T extends ObjectSchemaBuilder, K extends keyof T> extends Collection<DefaultFieldType<T, K>, ParsedRow<T>> {
    schema: T
    rows: GoogleSpreadsheetRow[]
    primaryKey: K

    constructor(primaryKey: K, schema: T) {
        super();
        this.schema = schema;
        this.primaryKey = primaryKey;
        this.rows = []
    }
  
    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = () => true, rows?: GoogleSpreadsheetRow[]) {
        if (rows) this.rows = rows
        else this.rows = await sheet.getRows();
        
        const key = this.schema[this.primaryKey]

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

    private parseRow(row: GoogleSpreadsheetRow): ParsedRow<T> {
        const result: any = {};
        for (const field in this.schema) {
            const f = this.schema[field]
            if (!f.type) f.type = "string"

            let value = row.get(f.key);
            if (f.arraySplitter) {
                const newValues = []
                for (const v of value?.split(f.arraySplitter) ?? []) {
                    if (this.isBlank(v)) continue;
                    const newVal = valueMapper(v, f);
                    if (newVal !== null) newValues.push(newVal);
                }
                value = newValues;
            } else {
                value = valueMapper(value, f)
                if (value === null && !f.possiblyNull) throw new Error(`Value for \`${field}\` on row ${row.rowNumber} was null when not expected`);
            }
 
            result[field] = value;
        }
        return result;
    }
}