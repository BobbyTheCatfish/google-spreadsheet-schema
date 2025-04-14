import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter } from "./utils";
type SupportedTypes = "string" | "number" | "boolean" | "date";
type SchemaField = {
    type: SupportedTypes;
    key: string;
    arraySplitter?: string;
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
type ParsedRow<T extends Schema> = {
    [K in keyof T]: T[K]["arraySplitter"] extends string ? TypeMap[T[K]["type"]][] : TypeMap[T[K]["type"]];
};
export default class ObjectSchema<T extends Schema> extends Collection<string, ParsedRow<T>> {
    schema: T;
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    constructor(primaryKey: string, schema: T);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, useExistingData?: boolean): Promise<void>;
    private valueMapper;
    private parseRow;
}
export {};
