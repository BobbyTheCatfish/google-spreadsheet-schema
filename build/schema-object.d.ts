import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, ObjectSchemaField, TypeMap } from "./utils";
export type ObjectSchemaBuilder = {
    [field: string]: ObjectSchemaField<keyof TypeMap>;
};
type OptionalNull<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["possiblyNull"] extends true ? T[K]["defaultValue"] extends null ? null : never : never;
type DefaultFieldType<T extends ObjectSchemaBuilder, K extends keyof T> = T[K]["type"] extends undefined ? string : TypeMap[Exclude<T[K]["type"], undefined>];
type FieldType<T extends ObjectSchemaBuilder, K extends keyof T> = TypeMap[DefaultType<TypeMap, T[K]["type"], "string">];
type ParsedRow<T extends ObjectSchemaBuilder> = {
    [K in keyof T]: (T[K]["type"] extends ("stringSet" | "numSet") ? FieldType<T, K> : T[K]["splitter"] extends string ? FieldType<T, K>[] : FieldType<T, K>) | OptionalNull<T, K>;
};
/**
 * A standard object based schema. Maps row to objects with keys and values of a given type.
 */
export default class ObjectSchema<T extends ObjectSchemaBuilder, K extends keyof T> extends Collection<DefaultFieldType<T, K>, ParsedRow<T>> {
    schema: T;
    rows: GoogleSpreadsheetRow[];
    primaryKey: K;
    sheet: GoogleSpreadsheetWorksheet | null;
    /**
     * Creates an object based schema.
     * @param primaryKey The column name to use as the collection key
     * @param schema A schema to build row objects
     */
    constructor(primaryKey: K, schema: T);
    /**
     * Loads and populates data from the sheet
     * @param sheet The Google Sheets Worksheet to load data from
     * @param filter A function to determine which rows should be included
     * @param rows  Pre-fetched rows. If not provided, this method will call `sheet.getRows()`
     */
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
    private isBlank;
    parseRow(row: GoogleSpreadsheetRow): ParsedRow<T>;
    private reverseParseRow;
    private updateOne;
    /**
     * Saves a new or updated row
     *
     * Calls ObjectSchema.set() and either GoogleSpreadsheetWorksheet.addRow() or .assign() and .save()
     * @param row The new or updated row
     */
    update(row: ParsedRow<T> | ParsedRow<T>[]): Promise<this>;
}
export {};
