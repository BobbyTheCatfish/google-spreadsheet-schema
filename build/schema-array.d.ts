import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, TypeMap } from "./utils";
export default class ArraySchema<T extends keyof TypeMap = "string"> extends Array<TypeMap[T]> {
    rows: GoogleSpreadsheetRow[];
    key: string;
    type: keyof TypeMap;
    constructor(key: string, type?: DefaultType<TypeMap, T, "string">);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
}
