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
    /**
     * Saves a new or updated row
     *
     * Calls ObjectSchema.set() and either GoogleSpreadsheetWorksheet.addRow() or .assign() and .save()
     * @param row The new or updated row
     */
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
                const row = yield this.sheet.addRow(parsed);
                this.rows.push(row);
            }
            _super.set.call(this, key, row);
            return this;
        });
    }
}
exports.default = ObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRW5ELG1DQUF1RjtBQWtCdkY7O0dBRUc7QUFDSCxNQUFxQixZQUErRCxTQUFRLHVCQUFnRDtJQU14STs7OztPQUlHO0lBQ0gsWUFBWSxVQUFhLEVBQUUsTUFBUztRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLElBQUk7NkRBQUMsS0FBaUMsRUFBRSxTQUFpQixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBNkI7WUFDcEcsSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBOztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFFbkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNuQyxJQUFJLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUNyRyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVPLE9BQU8sQ0FBQyxDQUFNO1FBQ2xCLE9BQU8sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRU8sUUFBUSxDQUFDLEdBQXlCOztRQUN0QyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUE7WUFFOUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLElBQUksS0FBSyxRQUFRO2dCQUFFLElBQUksR0FBRyxRQUFRLENBQUE7aUJBQ2pDLElBQUksSUFBSSxLQUFLLFdBQVc7Z0JBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQTtZQUU5QyxJQUFJLEtBQUssR0FBRyxNQUFBLE1BQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLG1DQUFJLENBQUMsQ0FBQyxZQUFZLG1DQUFJLElBQUksQ0FBQztZQUNyRCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDYixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUE7Z0JBQ3BCLEtBQUssTUFBTSxDQUFDLElBQUksTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7b0JBQzdDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQUUsU0FBUztvQkFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBVyxFQUFDLENBQUMsa0NBQU8sQ0FBQyxLQUFFLElBQUksSUFBRyxDQUFDO29CQUM5QyxJQUFJLE1BQU0sS0FBSyxJQUFJO3dCQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3BFLENBQUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM3QixJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsS0FBSyxhQUFhLEdBQUcsQ0FBQyxTQUFTLDZCQUE2QixDQUFDLENBQUM7WUFDeEksQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ3BFLENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU8sZUFBZSxDQUFDLEdBQWlCOztRQUNyQyxNQUFNLFNBQVMsR0FBMkIsRUFBRSxDQUFDO1FBQzdDLEtBQUssTUFBTSxLQUFLLElBQUksR0FBRyxFQUFFLENBQUM7WUFDdEIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsU0FBUztZQUNwQyxRQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNaLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUNoRCxDQUFDO2dCQUNELEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDWixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBQSxVQUFVLENBQUMsUUFBUSxtQ0FBSSxHQUFHLENBQUMsS0FBSSxNQUFBLFVBQVUsQ0FBQyxZQUFZLDBDQUFFLFFBQVEsRUFBRSxDQUFBLElBQUksRUFBRSxDQUFBO29CQUM3SCxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDdkMsQ0FBQztnQkFDRCxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtnQkFDakUsQ0FBQztnQkFDRCxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ1osU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7Z0JBQ2hELENBQUM7Z0JBQ0QsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNmLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFBLFVBQVUsQ0FBQyxRQUFRLG1DQUFJLEdBQUcsQ0FBQyxLQUFJLE1BQUEsVUFBVSxDQUFDLFlBQVksMENBQUUsUUFBUSxFQUFFLENBQUEsSUFBSSxFQUFFLENBQUE7b0JBQzdILFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUN2QyxDQUFDO2dCQUNELEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVixTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFJLEtBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtnQkFDcEUsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUE7SUFDcEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0csTUFBTSxDQUFDLEdBQWlCOzs7OztZQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFDckMsTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBVyxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFRLENBQUE7WUFDbkYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7WUFFL0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkYsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDcEIsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDdEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxPQUFNLEdBQUcsWUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFBO1FBQ2YsQ0FBQztLQUFBO0NBQ0o7QUF0SUQsK0JBc0lDIn0=