import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { Collection } from '@discordjs/collection';
type Mapper<t> = (row: GoogleSpreadsheetRow) => t;
type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined);
declare class Schema<t> extends Collection<string, t> {
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    mapper: Mapper<t>;
    constructor(primaryKey: string, mapper: Mapper<t>);
    load(sheet: GoogleSpreadsheetWorksheet, filter?: Filter, useExistingData?: boolean): Promise<void>;
}
export = Schema;
