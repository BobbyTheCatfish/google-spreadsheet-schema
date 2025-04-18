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
            this.clear();
            for (const row of this.rows) {
                const key = row.get(this.primaryKey);
                if (key && filter(row)) {
                    this.set(key, this.parseRow(row));
                }
            }
        });
    }
    isBlank(v) {
        return ["", undefined, null].includes(v);
    }
    parseRow(row) {
        var _a;
        const result = {};
        for (const field in this.schema) {
            const f = this.schema[field];
            let value = row.get(f.key);
            if (f.arraySplitter) {
                const newValues = [];
                for (const v of (_a = value === null || value === void 0 ? void 0 : value.split(f.arraySplitter)) !== null && _a !== void 0 ? _a : []) {
                    if (this.isBlank(v))
                        continue;
                    const newVal = (0, utils_1.valueMapper)(v, f.type);
                    if (newVal !== null)
                        newValues.push(newVal);
                }
                value = newValues;
            }
            else {
                value = (0, utils_1.valueMapper)(value, f.type);
                if (value === null && !f.possiblyNull)
                    throw new Error(`Value for \`${field}\` on row ${row.rowNumber} was null when not expected`);
            }
            result[field] = value;
        }
        return result;
    }
}
exports.default = ObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRW5ELG1DQUF1RDtBQXdCdkQsTUFBcUIsWUFBNEMsU0FBUSx1QkFBZ0M7SUFJckcsWUFBWSxVQUFrQixFQUFFLE1BQVM7UUFDckMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRUssSUFBSTs2REFBQyxLQUFpQyxFQUFFLFNBQWlCLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUE2QjtZQUNwRyxJQUFJLElBQUk7Z0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7O2dCQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXZDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNaLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQkFDcEMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDckMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFTyxPQUFPLENBQUMsQ0FBTTtRQUNsQixPQUFPLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUF5Qjs7UUFDdEMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTtnQkFDcEIsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQztvQkFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFBRSxTQUFTO29CQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFXLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxNQUFNLEtBQUssSUFBSTt3QkFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2dCQUNELEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVk7b0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLEtBQUssYUFBYSxHQUFHLENBQUMsU0FBUyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3hJLENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUFsREQsK0JBa0RDIn0=