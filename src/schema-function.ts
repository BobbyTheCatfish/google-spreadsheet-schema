import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, Mapper, AcceptableKeys } from "./utils";


export default class FunctionSchema<k extends AcceptableKeys, t> extends Collection<k, t> {
    rows: GoogleSpreadsheetRow[]
    primaryKey: string;
    mapper: Mapper<t, k>

    constructor (primaryKey: string, mapper: Mapper<t, k>) {
        super()
        this.mapper = mapper;
        this.rows = [];
        this.primaryKey = primaryKey;
    }

    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = () => true, rows?: GoogleSpreadsheetRow[]) {
        if (rows) this.rows = rows
        else this.rows = await sheet.getRows();

        this.clear()
        for (const row of this.rows) {
            const key = row.get(this.primaryKey)
            if (key && filter(row)) {
                this.set(key, this.mapper(row))
            }
        }
    }
}