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

type FieldType<T extends Schema, K extends keyof T> = TypeMap[T[K]["type"]]

type ParsedRow<T extends Schema> = {
    [K in keyof T]: T[K]["arraySplitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>;
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
            if (filter(row)) {
                this.set(row.get(this.primaryKey), this.parseRow(row))
            }
        }
    }
    private valueMapper(value: any, type: SupportedTypes) {
        switch (type) {
            case "number":
                value = parseFloat(value);
                break;
            case "boolean":
                value = value.toUpperCase() === "TRUE" || value === true;
                break;
            case "string":
                value = String(value);
                break;
            case "date":
                value = new Date(value)
                break;
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
        return value;
    }
    private parseRow(row: GoogleSpreadsheetRow): ParsedRow<T> {
        const result: any = {};
        for (const field in this.schema) {
            const { type, key, arraySplitter } = this.schema[field];
            let value = row.get(key);
            if (arraySplitter) {
                value = value
                    .split(arraySplitter)
                    .map((v: any) => this.valueMapper(v, type))
            } else {
                value = this.valueMapper(value, type)
            }
 
            result[field] = value;
        }
        return result;
    }
}