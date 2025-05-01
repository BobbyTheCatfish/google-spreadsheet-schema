import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, ObjectSchemaField, TypeMap, valueMapper } from "./utils";

/**
 * An array based schema. Maps a column to values of a given type.
 */
export default class ArraySchema<T extends keyof TypeMap = "string"> extends Array<TypeMap[T]> {
    rows: GoogleSpreadsheetRow[]
    key: string
    type: keyof TypeMap
    /**
     * Creates an array based schema. 
     * @param key The column name
     * @param type The type of content in the cell
     */
    constructor(key: string, type?: DefaultType<TypeMap, T, "string">) {
        super();
        this.key = key;
        this.type = type ?? "string"
        this.rows = []
    }

    /**
     * Loads and populates data from the sheet
     * @param sheet The Google Sheets Worksheet to load data from
     * @param filter A function to determine which rows should be included
     * @param rows  Pre-fetched rows. If not provided, this method will call `sheet.getRows()`
     */
    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = () => true, rows?: GoogleSpreadsheetRow[]) {
        if (rows) this.rows = rows
        else this.rows = await sheet.getRows();
        
        const field: ObjectSchemaField<keyof TypeMap> = {
            key: this.key,
            type: this.type,
        }

        this.length = 0;
        for (const row of this.rows) {
            const key = row.get(this.key)
            if (key && filter(row)) {
                this.push(valueMapper(key, field) as any)
            }
        }
    }
}

