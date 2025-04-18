import { GoogleSpreadsheetRow } from "google-spreadsheet";
export type Mapper<K, T> = (row: GoogleSpreadsheetRow) => T;
export type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined);
export type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    date: Date;
};
export type ObjectSchemaField<T extends keyof TypeMap> = {
    type: T;
    key: string;
    arraySplitter?: string;
    possiblyNull?: boolean;
    defaultValue?: TypeMap[T];
};
export type DefaultType<A extends keyof TypeMap | undefined> = undefined extends A ? "string" : A extends keyof TypeMap ? A : "string";
export declare function valueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>): string | number | boolean | Date | null;
export declare function innerValueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>): string | number | boolean | Date | null;
