import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, Mapper, valueMapper } from "./utils";

export type AcceptableKeys = {
    string: string,
    number: number
}

/**
 * A schema that relies on a function to map the values
 */
export default class FunctionSchema<K extends keyof AcceptableKeys | undefined, T> extends Collection<AcceptableKeys[DefaultType<AcceptableKeys, K, "string">], T> {
    rows: GoogleSpreadsheetRow[]
    primaryKey: string;
    mapper: Mapper<T>
    keyType: keyof AcceptableKeys

    /**
     * Creates a function based schema.
     * @param primaryKey The column name to use as the collection key
     * @param schema A function that takes a GoogleSpreadsheetRow and returns the parsed value
     */
    constructor (primaryKey: string, mapper: Mapper<T>, keyType: K = "string" as K) {
        super()
        this.mapper = mapper;
        this.rows = [];
        this.primaryKey = primaryKey;
        this.keyType = keyType ?? "string"
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

        this.clear()
        for (const row of this.rows) {
            const key = row.get(this.primaryKey)
            if (key && filter(row)) {
                this.set(valueMapper(key, { key: key, type: this.keyType }) as any, this.mapper(row))
            }
        }
    }
}
