import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, Mapper } from "./utils";
export { Filter, Mapper } from "./utils";
export default class FunctionSchema<k, t> extends Collection<k, t> {
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    mapper: Mapper<k, t>;
    constructor(primaryKey: string, mapper: Mapper<k, t>);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, rows?: GoogleSpreadsheetRow[]): Promise<void>;
}
