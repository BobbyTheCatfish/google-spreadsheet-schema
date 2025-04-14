import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import { Collection } from '@discordjs/collection'

type Mapper<t> = (row: GoogleSpreadsheetRow) => t
type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined)
class Schema<t> extends Collection<string, t> {
    rows: GoogleSpreadsheetRow[]
    primaryKey: string;
    mapper: Mapper<t>
    rowFilter: Filter

    constructor (primaryKey: string, mapper: Mapper<t>, filter?: Filter) {
        super()
        this.mapper = mapper;
        const defaultFilter = (r: GoogleSpreadsheetRow) => true
        this.rowFilter = filter || defaultFilter;
        this.rows = [];
        this.primaryKey = primaryKey;
    }

    async load(sheet: GoogleSpreadsheetWorksheet, useExistingData = false) {
        if (!useExistingData || sheet.rowCount === 0) {
            this.rows = await sheet.getRows();
        }
        this.clear()
        for (const row of this.rows) {
            if (this.rowFilter(row)) {
                this.set(row.get(this.primaryKey), this.mapper(row))
            }
        }
    }
}

export = Schema
