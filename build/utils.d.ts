import { GoogleSpreadsheetRow } from "google-spreadsheet";
export type Mapper<T> = (row: GoogleSpreadsheetRow) => T;
export type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined);
