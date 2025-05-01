import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, TypeMap } from "./utils";
import UtilSet from "./UtilSet";
/**
 * A set based schema. Maps a column to values of a given type.
 */
export default class SetSchema<T extends keyof TypeMap = "string"> extends UtilSet<TypeMap[T]> {
    rows: GoogleSpreadsheetRow[];
    key: string;
    type: keyof TypeMap;
    /**
     * Creates a set based schema.
     * @param key The column name
     * @param type The type of content in the cell
     */
    constructor(key: string, type?: DefaultType<TypeMap, T, "string">);
    /**
     * Loads and populates data from the sheet
     * @param sheet The Google Sheets Worksheet to load data from
     * @param filter A function to determine which rows should be included
     * @param rows  Pre-fetched rows. If not provided, this method will call `sheet.getRows()`
     */
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
}
