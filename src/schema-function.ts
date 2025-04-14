import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, Mapper } from "./utils";
export { Filter, Mapper } from "./utils";


export default class FunctionSchema<t> extends Collection<string, t> {
    rows: GoogleSpreadsheetRow[]
    primaryKey: string;
    mapper: Mapper<t>

    constructor (primaryKey: string, mapper: Mapper<t>) {
        super()
        this.mapper = mapper;
        this.rows = [];
        this.primaryKey = primaryKey;
    }

    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = () => true, useExistingData = false) {
        if (!useExistingData || sheet.rowCount === 0) {
            this.rows = await sheet.getRows();
        }
        this.clear()
        for (const row of this.rows) {
            if (filter(row)) {
                this.set(row.get(this.primaryKey), this.mapper(row))
            }
        }
    }
}