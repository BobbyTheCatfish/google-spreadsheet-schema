import { GoogleSpreadsheetRow } from "google-spreadsheet";
export type Mapper<T> = (row: GoogleSpreadsheetRow) => T;
/**
 * Determines if a row is valid and should be included
 * @param row A row in the sheet
 */
export type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined);
export type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    date: Date;
    stringSet: Set<string>;
    numSet: Set<number>;
};
type TypeMapWithoutSets = Omit<TypeMap, "stringSet" | "numSet"> & {
    stringSet: string;
    numSet: number;
};
export type ObjectSchemaField<T extends keyof TypeMap> = {
    type?: DefaultType<TypeMap, T, "string">;
    key: string;
    splitter?: string;
    possiblyNull?: boolean;
    defaultValue?: TypeMapWithoutSets[T];
};
export type DefaultType<T, A extends keyof T | undefined, D> = undefined extends A ? D : A extends keyof T ? A : D;
export declare function valueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>): any;
export declare function innerValueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>): any;
export {};
