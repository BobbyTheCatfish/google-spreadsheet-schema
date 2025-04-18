export default class UtilSet<T> extends Set<T> {

    hasAll(...values: T[]) {
        return values.every((value) => super.has(value))
    }

    hasAny(...values: T[]) {
        return values.some((value) => super.has(value))
    }

    first(): T | undefined;
	first(amount: number): T[];
    first(amount?: number): T | T[] | undefined {
        if (amount === undefined) return this.values().next().value;
        if (amount < 0) return this.last(amount * -1);
        amount = Math.floor(Math.min(this.size, amount));

        const iter = this.keys();
        const results: T[] = new Array(amount)
        for (let i = 0; i < amount; i++) {
            results.push(iter.next().value!)
        }
        return results
    }

    last(): T | undefined;
	last(amount: number): T[];
    last(amount?: number): T | T[] | undefined {
        const arr = this.toArray();
        if (amount === undefined) return arr[arr.length - 1];
        if (amount < 0) return this.first(amount * -1);
        return arr.slice(Math.floor(amount) * -1)
    }

    at(index: number) {
        index = Math.floor(index);

		if (index >= 0) {
			if (index >= this.size) return undefined;
		} else {
			index += this.size;
			if (index < 0) return undefined;
		}

		const iter = this.values();
		for (let skip = 0; skip < index; skip++) {
			iter.next();
		}

		return iter.next().value!;
    }

    random(): T | undefined;
	random(amount: number): T[];
	random(amount?: number): T | T[] | undefined {
		if (amount === undefined) return this.at(Math.floor(Math.random() * this.size));
		
        amount = Math.min(this.size, amount);
		if (!amount) return [];

		const values = this.toArray();

        const randomValues: T[] = []
        for (let i = 0; i < amount; i++) {
            randomValues.push(values.splice(Math.floor(Math.random() * values.length), 1)[0])
        }
        return randomValues;
	}

    reverse() {
        const values = this.toArray().reverse();
        this.clear();
        for (const value of values) this.add(value);
        return this;
    }

    sweep(fn: (value: T, utilSet: this) => unknown): number;
	sweep<This>(fn: (this: This, value: T, utilSet: this) => unknown, thisArg: This): number;
	sweep(fn: (value: T, utilSet: this) => unknown, thisArg?: unknown): number {
        if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`);
        if (thisArg !== undefined) fn = fn.bind(thisArg);

        const initialSize = this.size;

        const iter = this.values()
		for (let i = 0; i < this.size; i++) {
            const value = iter.next().value!;
			if (fn(value, this)) this.delete(value);
		}

		return initialSize - this.size;
    }

	filter<NewValue extends T>(fn: (value: T, utilSet: this) => value is NewValue): UtilSet<NewValue>;
	filter(fn: (value: T, utilSet: this) => unknown): UtilSet<T>;
	filter<This, NewValue extends T>(fn: (this: This, value: T, utilSet: this) => value is NewValue, thisArg: This): UtilSet<NewValue>;
	filter<This>(fn: (this: This, value: T, utilSet: this) => unknown, thisArg: This): UtilSet<T>;
	filter(fn: (value: T, utilSet: this) => unknown, thisArg?: unknown): UtilSet<T> {
		if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`);
		if (thisArg !== undefined) fn = fn.bind(thisArg);
		
        const iter = this.values()
        const results = new UtilSet<T>()
		for (let i = 0; i < this.size; i++) {
            const value = iter.next().value!;
			if (fn(value, this)) results.add(value);
		}

		return results;
	}

    map<NewValue>(fn: (value: T, utilSet: this) => NewValue): NewValue[];
	map<This, NewValue>(fn: (this: This, value: T, utilSet: this) => NewValue, thisArg: This): NewValue[];
	map<NewValue>(fn: (value: T, utilSet: this) => NewValue, thisArg?: unknown): NewValue[] {
		if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`);
		if (thisArg !== undefined) fn = fn.bind(thisArg);

		const iter = this.values();
		const results: NewValue[] = new Array(this.size);
		for (let index = 0; index < this.size; index++) {
			const value = iter.next().value!;
			results.push(fn(value, this));
		}

		return results;
	}

    concat<N>(...utilSets: UtilSet<N>[]) {
        const newSet = this.clone() as unknown as UtilSet<N>;
        for (const set of utilSets) {
            const iter = set.values()
            for (let i = 0; i < set.size; i++) {
                const value = iter.next().value!
                newSet.add(value)
            }
        }
    }

    toArray() {
        return [...this.values()]
    }

    clone() {
        return new UtilSet<T>(this.values())
    }
}