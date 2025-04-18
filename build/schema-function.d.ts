import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, Mapper } from "./utils";
export type AcceptableKeys = {
    string: string;
    number: number;
};
export default class FunctionSchema<K extends keyof AcceptableKeys | undefined, T> extends Collection<AcceptableKeys[DefaultType<AcceptableKeys, K, "string">], T> {
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    mapper: Mapper<T>;
    keyType: keyof AcceptableKeys;
    constructor(primaryKey: string, mapper: Mapper<T>, keyType?: K);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
}
