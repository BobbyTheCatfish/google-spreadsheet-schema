import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import { Collection } from '@discordjs/collection'

type Mapper<t> = (row: GoogleSpreadsheetRow) => t
type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined)
class Schema<t> extends Collection<string, t> {
    rows: GoogleSpreadsheetRow[]
    primaryKey: string;
    mapper: Mapper<t>

    constructor (primaryKey: string, mapper: Mapper<t>) {
        super()
        this.mapper = mapper;
        const defaultFilter = (r: GoogleSpreadsheetRow) => true
        this.rows = [];
        this.primaryKey = primaryKey;
    }

    async load(sheet: GoogleSpreadsheetWorksheet, filter: Filter = (r) => true, useExistingData = false) {
        if (!useExistingData || sheet.rowCount === 0) {
            this.rows = await sheet.getRows();
        }
        this.clear()
        for (const row of this.rows) {
            if (filter(row)) {
                this.set(row.get(this.primaryKey), this.mapper(row))
            }
        }
    }
}

export = Schema
