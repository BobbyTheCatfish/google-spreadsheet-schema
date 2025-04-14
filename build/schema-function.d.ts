import { Collection } from "@discordjs/collection";
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Filter, Mapper } from "./utils";
export { Filter, Mapper } from "./utils";
export default class FunctionSchema<t> extends Collection<string, t> {
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    mapper: Mapper<t>;
    constructor(primaryKey: string, mapper: Mapper<t>);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, useExistingData?: boolean): Promise<void>;
}
