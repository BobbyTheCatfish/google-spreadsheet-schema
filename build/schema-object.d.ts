import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, ObjectSchemaField, TypeMap } from "./utils";
export type ObjectSchemaBuilder = {
    [field: string]: ObjectSchemaField<keyof TypeMap>;
};
type OptionalNull<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["possiblyNull"] extends true ? T[K]["defaultValue"] extends null ? null : never : never;
type DefaultFieldType<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["type"] extends undefined ? TypeMap["string"] : TypeMap[Exclude<T[K]["type"], undefined>];
type FieldType<T extends ObjectSchemaBuilder, K extends keyof T> = DefaultFieldType<T, K>;
type ParsedRow<T extends ObjectSchemaBuilder> = {
    [K in keyof T]: (T[K]["arraySplitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>) | OptionalNull<T, K>;
};
export default class ObjectSchema<T extends ObjectSchemaBuilder, K extends keyof T> extends Collection<DefaultFieldType<T, K>, ParsedRow<T>> {
    schema: T;
    rows: GoogleSpreadsheetRow[];
    primaryKey: K;
    constructor(primaryKey: K, schema: T);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
    private isBlank;
    private parseRow;
}
export {};
