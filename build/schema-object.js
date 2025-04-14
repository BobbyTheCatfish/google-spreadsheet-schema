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
            case "number":
                value = parseFloat(value);
                break;
            case "boolean":
                value = value.toUpperCase() === "TRUE" || value === true;
                break;
            case "string":
                value = String(value);
                break;
            case "date":
                value = new Date(value);
                break;
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
        return value;
    }
    parseRow(row) {
        const result = {};
        for (const field in this.schema) {
            const { type, key, arraySplitter } = this.schema[field];
            let value = row.get(key);
            if (arraySplitter) {
                value = value
                    .split(arraySplitter)
                    .map((v) => this.valueMapper(v, type));
            }
            else {
                value = this.valueMapper(value, type);
            }
            result[field] = value;
        }
        return result;
    }
}
exports.default = ObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1EO0FBMkJuRCxNQUFxQixZQUErQixTQUFRLHVCQUFnQztJQUl4RixZQUFZLFVBQWtCLEVBQUUsTUFBUztRQUNyQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFSyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRyxLQUFLO1lBQzlGLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzFELENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBQ08sV0FBVyxDQUFDLEtBQVUsRUFBRSxJQUFvQjtRQUNoRCxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ1gsS0FBSyxRQUFRO2dCQUNULEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztnQkFDekQsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDdkIsTUFBTTtZQUNWO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTyxRQUFRLENBQUMsR0FBeUI7UUFDdEMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixLQUFLLEdBQUcsS0FBSztxQkFDUixLQUFLLENBQUMsYUFBYSxDQUFDO3FCQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkQsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN6QyxDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKO0FBMURELCtCQTBEQyJ9