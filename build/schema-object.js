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
/**
 * A standard object based schema. Maps row to objects with keys and values of a given type.
 */
class ObjectSchema extends collection_1.Collection {
    /**
     * Creates an object based schema.
     * @param primaryKey The column name to use as the collection key
     * @param schema A schema to build row objects
     */
    constructor(primaryKey, schema) {
        super();
        this.sheet = null;
        this.schema = schema;
        this.primaryKey = primaryKey;
        this.rows = [];
    }
    /**
     * Loads and populates data from the sheet
     * @param sheet The Google Sheets Worksheet to load data from
     * @param filter A function to determine which rows should be included
     * @param rows  Pre-fetched rows. If not provided, this method will call `sheet.getRows()`
     */
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
            let value = row.get(f.key);
            if (f.splitter) {
                const newValues = [];
                for (const v of (_a = value === null || value === void 0 ? void 0 : value.split(f.splitter)) !== null && _a !== void 0 ? _a : []) {
                    if (this.isBlank(v))
                        continue;
                    const newVal = (0, utils_1.valueMapper)(v, Object.assign(Object.assign({}, f), { type }));
                    if (newVal !== null)
                        newValues.push(newVal);
                }
                value = f.type.endsWith("Set") ? new Set(newValues) : newValues;
            }
            else if (!f.type.endsWith("Set")) {
                value = (_c = (_b = (0, utils_1.valueMapper)(value, f)) !== null && _b !== void 0 ? _b : f.defaultValue) !== null && _c !== void 0 ? _c : null;
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
    updateOne(row) {
        const pkey = this.schema[this.primaryKey];
        if (!pkey.type)
            pkey.type = "string";
        const key = (0, utils_1.valueMapper)(row[this.primaryKey], { key: pkey.key, type: pkey.type });
        const parsed = this.reverseParseRow(row);
        const found = this.rows.find(r => r.get(pkey.key) === String(row[this.primaryKey]));
        this.set(key, row);
        if (found) {
            found.assign(parsed);
            return { found, key, row };
        }
        else {
            return { key, row, parsed };
        }
    }
    /**
     * Saves a new or updated row
     *
     * Calls ObjectSchema.set() and either GoogleSpreadsheetWorksheet.addRow() or .assign() and .save()
     * @param row The new or updated row
     */
    update(row) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sheet)
                throw new Error(`No sheet set for schema with key ${String(this.primaryKey)}`);
            if (Array.isArray(row)) {
                const updates = row.map(r => this.updateOne(r));
                const newRows = updates.filter(u => u.parsed);
                const inserted = yield this.sheet.addRows(newRows.map(r => r.parsed));
                const updated = updates.filter(u => u.found);
                yield Promise.all(updated.map(u => u.found.save()));
                for (const r of inserted) {
                    this.rows.push(r);
                }
            }
            else {
                const r = this.updateOne(row);
                if (r.found) {
                    yield r.found.save();
                }
                else {
                    this.rows.push(yield this.sheet.addRow(r.parsed));
                }
            }
            return this;
        });
    }
}
exports.default = ObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRW5ELG1DQUF1RjtBQWtCdkY7O0dBRUc7QUFDSCxNQUFxQixZQUErRCxTQUFRLHVCQUFnRDtJQU14STs7OztPQUlHO0lBQ0gsWUFBWSxVQUFhLEVBQUUsTUFBUztRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLElBQUk7NkRBQUMsS0FBaUMsRUFBRSxTQUFpQixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBNkI7WUFDcEcsSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBOztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFFbkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdB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