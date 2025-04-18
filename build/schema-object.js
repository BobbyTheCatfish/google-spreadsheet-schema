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
            const key = this.schema[this.primaryKey];
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
        var _a;
        const result = {};
        for (const field in this.schema) {
            const f = this.schema[field];
            if (!f.type)
                f.type = "string";
            let value = row.get(f.key);
            if (f.arraySplitter) {
                const newValues = [];
                for (const v of (_a = value === null || value === void 0 ? void 0 : value.split(f.arraySplitter)) !== null && _a !== void 0 ? _a : []) {
                    if (this.isBlank(v))
                        continue;
                    const newVal = (0, utils_1.valueMapper)(v, f);
                    if (newVal !== null)
                        newValues.push(newVal);
                }
                value = newValues;
            }
            else {
                value = (0, utils_1.valueMapper)(value, f);
                if (value === null && !f.possiblyNull)
                    throw new Error(`Value for \`${field}\` on row ${row.rowNumber} was null when not expected`);
            }
            result[field] = value;
        }
        return result;
    }
}
exports.default = ObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRW5ELG1DQUEwRTtBQWdCMUUsTUFBcUIsWUFBK0QsU0FBUSx1QkFBZ0Q7SUFLeEksWUFBWSxVQUFhLEVBQUUsTUFBUztRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFSyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQTZCO1lBQ3BHLElBQUksSUFBSTtnQkFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTs7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFFeEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNuQyxJQUFJLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUNyRyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVPLE9BQU8sQ0FBQyxDQUFNO1FBQ2xCLE9BQU8sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRU8sUUFBUSxDQUFDLEdBQXlCOztRQUN0QyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUE7WUFFOUIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTtnQkFDcEIsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQztvQkFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFBRSxTQUFTO29CQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFXLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLE1BQU0sS0FBSyxJQUFJO3dCQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBQ0QsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUN0QixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osS0FBSyxHQUFHLElBQUEsbUJBQVcsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxLQUFLLGFBQWEsR0FBRyxDQUFDLFNBQVMsNkJBQTZCLENBQUMsQ0FBQztZQUN4SSxDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKO0FBdkRELCtCQXVEQyJ9