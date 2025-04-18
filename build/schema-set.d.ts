import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { DefaultType, Filter, TypeMap } from "./utils";
import UtilSet from "./UtilSet";
export default class SetSchema<T extends keyof TypeMap = "string"> extends UtilSet<TypeMap[T]> {
    rows: GoogleSpreadsheetRow[];
    key: string;
    type: keyof TypeMap;
    constructor(key: string, type?: DefaultType<T>);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
}
