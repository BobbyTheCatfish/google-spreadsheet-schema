import { GoogleSpreadsheetRow } from "google-spreadsheet";
export type Mapper<T> = (row: GoogleSpreadsheetRow) => T;
export type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined);
export type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    date: Date;
};
export type DefaultType<A extends keyof TypeMap | undefined> = undefined extends A ? "string" : A extends keyof TypeMap ? A : "string";
export declare function valueMapper(value: any, type: keyof TypeMap): string | number | boolean | Date;
