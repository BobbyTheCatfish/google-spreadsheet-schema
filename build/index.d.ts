import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { Collection } from '@discordjs/collection';
type Mapper<t> = (row: GoogleSpreadsheetRow) => t;
type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined);
declare class Schema<t> extends Collection<string, t> {
    rows: GoogleSpreadsheetRow[];
    primaryKey: string;
    mapper: Mapper<t>;
    rowFilter: Filter;
    constructor(primaryKey: string, mapper: Mapper<t>, filter?: Filter);
    load(sheet: GoogleSpreadsheetWorksheet, useExistingData?: boolean): Promise<void>;
}
export = Schema;
