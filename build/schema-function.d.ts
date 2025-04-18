import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, Mapper, AcceptableKeys } from "./utils";
export default class FunctionSchema<k extends AcceptableKeys, t> extends Collection<k, t> {
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    mapper: Mapper<t, k>;
    constructor(primaryKey: string, mapper: Mapper<t, k>);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
}
