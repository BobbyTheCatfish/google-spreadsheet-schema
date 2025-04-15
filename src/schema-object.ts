import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter } from "./utils";

type SupportedTypes = "string" | "number" | "boolean"| "date";

type SchemaField = {
    type: SupportedTypes;
    key: string;
    arraySplitter?: string;
    possiblyNull?: boolean
};
  
export type Schema = {
    [field: string]: SchemaField;
};

type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    date: Date;
};

type OptionalNull<T extends Schema, K extends keyof T> = T[K]["possiblyNull"] extends true ? null : never

type FieldType<T extends Schema, K extends keyof T> = TypeMap[T[K]["type"]]

type ParsedRow<T extends Schema> = {
    [K in keyof T]: (T[K]["arraySplitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>) | OptionalNull<T, K>;
};

export default class ObjectSchema<T extends Schema> extends Collection<string, ParsedRow<T>> {
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

    private valueMapper(value: any, type: SupportedTypes) {
        switch (type) {
            case "number": return parseFloat(value);
            case "boolean": return value.toUpperCase() === "TRUE" || value === true;
            case "string": return String(value);
            case "date": return new Date(value);
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }

    private isBlank(v: any) {
        return ["", undefined, null].includes(v)
    }

    private parseRow(row: GoogleSpreadsheetRow): ParsedRow<T> {
        const result: any = {};
        for (const field in this.schema) {
            const { type, key, arraySplitter, possiblyNull } = this.schema[field];
            let value = row.get(key);
            if (arraySplitter) {
                value = value
                    .split(arraySplitter)
                    .filter((v: any) => !this.isBlank(v))
                    .map((v: any) => this.valueMapper(v, type))
            } else {
                if (this.isBlank(value)) {
                    if (possiblyNull) value = null;
                    else throw new Error(`Value for \`${field}\` was null when not expected`);
                } else {
                    value = this.valueMapper(value, type)
                }
            }
 
            result[field] = value;
        }
        return result;
    }
}