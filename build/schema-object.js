"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@discordjs/collection");
const utils_1 = require("./utils");
class ObjectSchema extends collection_1.Collection {
    constructor(primaryKey, schema) {
        super();
        this.sheet = null;
        this.schema = schema;
        this.primaryKey = primaryKey;
        this.rows = [];
    }
    load(sheet_1) {
        return __awaiter(this, arguments, void 0, function* (sheet, filter = () => true, rows) {
            if (rows)
                this.rows = rows;
            else
                this.rows = yield sheet.getRows();
            this.sheet = sheet;
            const key = this.schema[this.primaryKey];
            if (!key.type)
                key.type = "string";
            this.clear();
            for (const row of this.rows) {
                const primaryKey = row.get(key.key);
                if (primaryKey && filter(row)) {
                    this.set((0, utils_1.valueMapper)(primaryKey, { key: primaryKey, type: key.type }), this.parseRow(row));
                }
            }
        });
    }
    isBlank(v) {
        return ["", undefined, null].includes(v);
    }
    parseRow(row) {
        var _a, _b, _c;
        const result = {};
        for (const field in this.schema) {
            const f = this.schema[field];
            if (!f.type)
                f.type = "string";
            let type = f.type;
            if (type === "numSet")
                type = "number";
            else if (type === "stringSet")
                type = "string";
            let value = (_b = (_a = row.get(f.key)) !== null && _a !== void 0 ? _a : f.defaultValue) !== null && _b !== void 0 ? _b : null;
            if (f.splitter) {
                const newValues = [];
                for (const v of (_c = value === null || value === void 0 ? void 0 : value.split(f.splitter)) !== null && _c !== void 0 ? _c : []) {
                    if (this.isBlank(v))
                        continue;
                    const newVal = (0, utils_1.valueMapper)(v, Object.assign(Object.assign({}, f), { type }));
                    if (newVal !== null)
                        newValues.push(newVal);
                }
                value = f.type.endsWith("Set") ? new Set(newValues) : newValues;
            }
            else if (!f.type.endsWith("Set")) {
                value = (0, utils_1.valueMapper)(value, f);
                if (value === null && !f.possiblyNull)
                    throw new Error(`Value for \`${field}\` on row ${row.rowNumber} was null when not expected`);
            }
            else {
                throw new Error(`Expected property splitter for field ${f.key}`);
            }
            result[field] = value;
        }
        return result;
    }
    reverseParseRow(row) {
        var _a, _b, _c, _d;
        const newRecord = {};
        for (const field in row) {
            const value = row[field];
            const schemaProp = this.schema[field];
            if (!schemaProp || !value)
                continue;
            switch (schemaProp.type) {
                case "number": {
                    newRecord[schemaProp.key] = value.toString();
                }
                case "numSet": {
                    const joined = Array.from(value).join((_a = schemaProp.splitter) !== null && _a !== void 0 ? _a : " ") || ((_b = schemaProp.defaultValue) === null || _b === void 0 ? void 0 : _b.toString()) || "";
                    newRecord[schemaProp.key] = joined;
                }
                case "boolean": {
                    newRecord[schemaProp.key] = value === true ? "TRUE" : "FALSE";
                }
                case "string": {
                    newRecord[schemaProp.key] = value.toString();
                }
                case "stringSet": {
                    const joined = Array.from(value).join((_c = schemaProp.splitter) !== null && _c !== void 0 ? _c : " ") || ((_d = schemaProp.defaultValue) === null || _d === void 0 ? void 0 : _d.toString()) || "";
                    newRecord[schemaProp.key] = joined;
                }
                case "date": {
                    newRecord[schemaProp.key] = value.valueOf().toString();
                }
            }
        }
        return newRecord;
    }
    update(row) {
        const _super = Object.create(null, {
            set: { get: () => super.set }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const pkey = this.schema[this.primaryKey];
            if (!pkey.type)
                pkey.type = "string";
            const key = (0, utils_1.valueMapper)(this.primaryKey, { key: pkey.key, type: pkey.type });
            const parsed = this.reverseParseRow(row);
            if (!this.sheet)
                throw new Error(`No sheet set for schema with key ${String(this.primaryKey)}`);
            const found = this.rows.find(r => r.get(pkey.key) === String(row[this.primaryKey]));
            if (found) {
                this.ensure(key, () => row);
                found.assign(parsed);
                yield found.save();
            }
            else {
                yield this.sheet.addRow(parsed);
            }
            _super.set.call(this, key, row);
            return this;
        });
    }
}
exports.default = ObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRW5ELG1DQUF1RjtBQW1CdkYsTUFBcUIsWUFBK0QsU0FBUSx1QkFBZ0Q7SUFNeEksWUFBWSxVQUFhLEVBQUUsTUFBUztRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFSyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQTZCO1lBQ3BHLElBQUksSUFBSTtnQkFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTs7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBRW5DLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNaLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbkMsSUFBSSxVQUFVLElBQUksTUFB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