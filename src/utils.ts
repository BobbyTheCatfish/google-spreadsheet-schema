import { GoogleSpreadsheetRow } from "google-spreadsheet"

export type Mapper<T> = (row: GoogleSpreadsheetRow) => T

export type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined)

export type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    date: Date;
};

export type ObjectSchemaField<T extends keyof TypeMap> = {
    type?: DefaultType<TypeMap, T, "string">;
    key: string;
    arraySplitter?: string;
    possiblyNull?: boolean
    defaultValue?: TypeMap[T]
};

export type DefaultType<T, A extends keyof T | undefined, D> = undefined extends A ? D : A extends keyof T ? A : D

export function valueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>) {
    return (innerValueMapper(value, field) || field.defaultValue) ?? null
}

export function innerValueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>) {
    if (value === undefined || value === null) return value;
    switch (field.type) {
        case "number": {
            const num = parseFloat(value);
            if (isNaN(num)) return null
            return num;
        }
        case "boolean": return value.toUpperCase() === "TRUE" || value === true;
        case "string": return String(value);
        case "date": {
            const num = parseInt(value);
            if (!isNaN(num)) return new Date(num);
            const date = new Date(value)
            if (isNaN(date.valueOf())) return null;
            return date;
        }
        default: throw new Error(`Unsupported type: ${field.type}`);
    }
}