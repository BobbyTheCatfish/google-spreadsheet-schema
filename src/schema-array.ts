import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, ObjectSchemaField, TypeMap, valueMapper } from "./utils";

export default class ArraySchema<T extends keyof TypeMap = "string"> extends Array<TypeMap[T]> {
    rows: GoogleSpreadsheetRow[]
    key: string
    type: keyof TypeMap
    constructor(key: string, type?: DefaultType<TypeMap, T, "string">) {
        super();
        this.key = key;
        this.type = type ?? "string"
        this.rows = []
    }

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
                this.push(valueMapper(row, field) as any)
            }
        }
    }
}

