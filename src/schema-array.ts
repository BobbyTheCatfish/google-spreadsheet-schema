import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, TypeMap, valueMapper } from "./utils";

export default class ArraySchema<T extends keyof TypeMap = "string"> extends Array<TypeMap[T]> {
    rows: GoogleSpreadsheetRow[]
    key: string
    type: keyof TypeMap
    constructor(key: string, type?: DefaultType<T>) {
        super();
        this.key = key;
        this.type = type ?? "string"
        this.rows = []
    }

    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = () => true, useExistingData = false) {
        if (!useExistingData || sheet.rowCount === 0) {
            this.rows = await sheet.getRows();
        }
        this.length = 0;
        for (const row of this.rows) {
            const key = row.get(this.key)
            if (key && filter(row)) {
                this.push(valueMapper(row, this.type) as any)
            }
        }
    }
}

