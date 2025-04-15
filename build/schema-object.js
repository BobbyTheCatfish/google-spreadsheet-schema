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
class ObjectSchema extends collection_1.Collection {
    constructor(primaryKey, schema) {
        super();
        this.schema = schema;
        this.primaryKey = primaryKey;
        this.rows = [];
    }
    load(sheet_1) {
        return __awaiter(this, arguments, void 0, function* (sheet, filter = () => true, useExistingData = false) {
            if (!useExistingData || sheet.rowCount === 0) {
                this.rows = yield sheet.getRows();
            }
            this.clear();
            for (const row of this.rows) {
                if (filter(row)) {
                    this.set(row.get(this.primaryKey), this.parseRow(row));
                }
            }
        });
    }
    valueMapper(value, type) {
        switch (type) {
            case "number": return parseFloat(value);
            case "boolean": return value.toUpperCase() === "TRUE" || value === true;
            case "string": return String(value);
            case "date": return new Date(value);
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }
    isBlank(v) {
        return ["", undefined, null].includes(v);
    }
    parseRow(row) {
        const result = {};
        for (const field in this.schema) {
            const { type, key, arraySplitter, possiblyNull } = this.schema[field];
            let value = row.get(key);
            if (arraySplitter) {
                value = value
                    .split(arraySplitter)
                    .filter((v) => !this.isBlank(v))
                    .map((v) => this.valueMapper(v, type));
            }
            else {
                if (this.isBlank(value)) {
                    if (possiblyNull)
                        value = null;
                    else
                        throw new Error(`Value for \`${field}\` was null when not expected`);
                }
                else {
                    value = this.valueMapper(value, type);
                }
            }
            result[field] = value;
        }
        return result;
    }
}
exports.default = ObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBZ0NuRCxNQUFxQixZQUErQixTQUFRLHVCQUFnQztJQUl4RixZQUFZLFVBQWtCLEVBQUUsTUFBUztRQUNyQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFSyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRyxLQUFLO1lBQzlGLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzFELENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRU8sV0FBVyxDQUFDLEtBQVUsRUFBRSxJQUFvQjtRQUNoRCxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ1gsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1lBQ3hFLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztJQUNMLENBQUM7SUFFTyxPQUFPLENBQUMsQ0FBTTtRQUNsQixPQUFPLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUF5QjtRQUN0QyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixLQUFLLEdBQUcsS0FBSztxQkFDUixLQUFLLENBQUMsYUFBYSxDQUFDO3FCQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDcEMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25ELENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxZQUFZO3dCQUFFLEtBQUssR0FBRyxJQUFJLENBQUM7O3dCQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsS0FBSywrQkFBK0IsQ0FBQyxDQUFDO2dCQUM5RSxDQUFDO3FCQUFNLENBQUM7b0JBQ0osS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN6QyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQTdERCwrQkE2REMifQ==