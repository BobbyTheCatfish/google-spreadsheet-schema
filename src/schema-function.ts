import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, Mapper, valueMapper } from "./utils";

export type AcceptableKeys = {
    string: string,
    number: number
}

export default class FunctionSchema<K extends keyof AcceptableKeys | undefined, T> extends Collection<AcceptableKeys[DefaultType<AcceptableKeys, K, "string">], T> {
    rows: GoogleSpreadsheetRow[]
    primaryKey: string;
    mapper: Mapper<T>
    keyType: keyof AcceptableKeys

    constructor (primaryKey: string, mapper: Mapper<T>, keyType: K = "string" as K) {
        super()
        this.mapper = mapper;
        this.rows = [];
        this.primaryKey = primaryKey;
        this.keyType = keyType ?? "string"
    }

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
