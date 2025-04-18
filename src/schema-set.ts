import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, ObjectSchemaField, TypeMap, valueMapper } from "./utils";
import UtilSet from "./UtilSet";

export default class SetSchema<T extends keyof TypeMap = "string"> extends UtilSet<TypeMap[T]> {
    rows: GoogleSpreadsheetRow[]
    key: string
    type: keyof TypeMap
    constructor(key: string, type?: DefaultType<T>) {
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

        this.clear();
        for (const row of this.rows) {
            const key = row.get(this.key)
            if (key && filter(row)) {
                this.add(valueMapper(row, field) as any)
            }
        }
    }
}

