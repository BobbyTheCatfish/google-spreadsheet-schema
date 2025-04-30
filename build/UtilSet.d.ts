export default class UtilSet<T> extends Set<T> {
    hasAll(...values: T[]): boolean;
    hasAny(...values: T[]): boolean;
    first(): T | undefined;
    first(amount: number): T[];
    last(): T | undefined;
    last(amount: number): T[];
    at(index: number): NonNullable<T> | undefined;
    random(): T | undefined;
    random(amount: number): T[];
    reverse(): this;
    sweep(fn: (value: T, utilSet: this) => unknown): number;
    sweep<This>(fn: (this: This, value: T, utilSet: this) => unknown, thisArg: This): number;
    filter<NewValue extends T>(fn: (value: T, utilSet: this) => value is NewValue): UtilSet<NewValue>;
    filter(fn: (value: T, utilSet: this) => unknown): UtilSet<T>;
    filter<This, NewValue extends T>(fn: (this: This, value: T, utilSet: this) => value is NewValue, thisArg: This): UtilSet<NewValue>;
    filter<This>(fn: (this: This, value: T, utilSet: this) => unknown, thisArg: This): UtilSet<T>;
    map<NewValue>(fn: (value: T, utilSet: this) => NewValue): NewValue[];
    map<This, NewValue>(fn: (this: This, value: T, utilSet: this) => NewValue, thisArg: This): NewValue[];
    concat<N>(...utilSets: UtilSet<N>[]): void;
    toArray(): T[];
    clone(): UtilSet<T>;
}
