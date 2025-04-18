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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBRW5ELG1DQUEwRTtBQWdCMUUsTUFBcUIsWUFBK0QsU0FBUSx1QkFBZ0Q7SUFLeEksWUFBWSxVQUFhLEVBQUUsTUFBUztRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFSyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQTZCO1lBQ3BHLElBQUksSUFBSTtnQkFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTs7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBRW5DLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNaLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbkMsSUFBSSxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBQSxtQkFBVyxFQUFDLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDckcsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFTyxPQUFPLENBQUMsQ0FBTTtRQUNsQixPQUFPLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUF5Qjs7UUFDdEMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFBO1lBRTlCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNsQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUE7Z0JBQ3BCLEtBQUssTUFBTSxDQUFDLElBQUksTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7b0JBQ2xELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQUUsU0FBUztvQkFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBVyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxNQUFNLEtBQUssSUFBSTt3QkFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2dCQUNELEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM3QixJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsS0FBSyxhQUFhLEdBQUcsQ0FBQyxTQUFTLDZCQUE2QixDQUFDLENBQUM7WUFDeEksQ0FBQztZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQXhERCwrQkF3REMifQ==