import { GoogleSpreadsheetRow } from "google-spreadsheet";
export type Mapper<T> = (row: GoogleSpreadsheetRow) => T;
export type Filter = (row: GoogleSpreadsheetRow) => (boolean | null | undefined);
export type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    date: Date;
};
export type ObjectSchemaField<T extends keyof TypeMap> = {
    type?: DefaultType<TypeMap, T, "string">;
    key: string;
    arraySplitter?: string;
    possiblyNull?: boolean;
    defaultValue?: TypeMap[T];
};
export type DefaultType<T, A extends keyof T | undefined, D> = undefined extends A ? D : A extends keyof T ? A : D;
export declare function valueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>): string | number | boolean | Date | null;
export declare function innerValueMapper(value: any, field: ObjectSchemaField<keyof TypeMap>): string | number | boolean | Date | null;
