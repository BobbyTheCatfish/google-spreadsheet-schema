import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, TypeMap } from "./utils";
export type ObjectSchemaField = {
    type: keyof TypeMap;
    key: string;
    arraySplitter?: string;
    possiblyNull?: boolean;
};
export type ObjectSchemaBuilder = {
    [field: string]: ObjectSchemaField;
};
type OptionalNull<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["possiblyNull"] extends true ? null : never;
type FieldType<T extends ObjectSchemaBuilder, K extends keyof T> = TypeMap[T[K]["type"]];
type ParsedRow<T extends ObjectSchemaBuilder> = {
    [K in keyof T]: (T[K]["arraySplitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>) | OptionalNull<T, K>;
};
export default class ObjectSchema<T extends ObjectSchemaBuilder> extends Collection<string, ParsedRow<T>> {
    schema: T;
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    constructor(primaryKey: string, schema: T);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, useExistingData?: boolean): Promise<void>;
    private isBlank;
    private parseRow;
}
export {};
