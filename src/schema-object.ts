import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, TypeMap, valueMapper } from "./utils";

export type ObjectSchemaField<T extends keyof TypeMap> = {
    type: T;
    key: string;
    arraySplitter?: string;
    possiblyNull?: boolean
    defaultValue?: TypeMap[T]
};
  
export type ObjectSchemaBuilder = {
    [field: string]: ObjectSchemaField<keyof TypeMap>;
};



type OptionalNull<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["possiblyNull"] extends true ? T[K]["defaultValue"] extends null ? null : never : never

type FieldType<T extends ObjectSchemaBuilder, K extends keyof T> = TypeMap[T[K]["type"]]

type ParsedRow<T extends ObjectSchemaBuilder> = {
    [K in keyof T]: (T[K]["arraySplitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>) | OptionalNull<T, K>;
};

export default class ObjectSchema<T extends ObjectSchemaBuilder> extends Collection<string, ParsedRow<T>> {
    schema: T
    rows: GoogleSpreadsheetRow[]
    primaryKey: string
    constructor(primaryKey: string, schema: T) {
        super();
        this.schema = schema;
        this.primaryKey = primaryKey;
        this.rows = []
    }
  
    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = () => true, useExistingData = false) {
        if (!useExistingData || sheet.rowCount === 0) {
            this.rows = await sheet.getRows();
        }
        this.clear()
        for (const row of this.rows) {
            const key = row.get(this.primaryKey)
            if (key && filter(row)) {
                this.set(key, this.parseRow(row))
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
            let value = row.get(f.key);
            if (f.arraySplitter) {
                const newValues = []
                for (const v of value?.split(f.arraySplitter) ?? []) {
                    if (this.isBlank(v)) continue;
                    const newVal = valueMapper(v, f.type);
                    if (newVal !== null) newValues.push(newVal);
                }
                value = newValues;
            } else {
                value = valueMapper(value, f.type)
                if (value === null && !f.possiblyNull) throw new Error(`Value for \`${field}\` on row ${row.rowNumber} was null when not expected`);
            }
 
            result[field] = value;
        }
        return result;
    }
}