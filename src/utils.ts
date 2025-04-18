import { GoogleSpreadsheetRow } from "google-spreadsheet"

export type Mapper<T> = (row: GoogleSpreadsheetRow) => T
export type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined)

export type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    date: Date;
};

export type DefaultType<A extends keyof TypeMap | undefined> = undefined extends A ? "string" : A extends keyof TypeMap ? A : "string"

export function valueMapper(value: any, type: keyof TypeMap) {
    switch (type) {
        case "number": return parseFloat(value);
        case "boolean": return value.toUpperCase() === "TRUE" || value === true;
        case "string": return String(value);
        case "date": return new Date(value);
        default: throw new Error(`Unsupported type: ${type}`);
    }
}