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
const utils_1 = require("./utils");
class ArraySchema extends Array {
    constructor(key, type) {
        super();
        this.key = key;
        this.type = type !== null && type !== void 0 ? type : "string";
        this.rows = [];
    }
    load(sheet_1) {
        return __awaiter(this, arguments, void 0, function* (sheet, filter = () => true, rows) {
            if (rows)
                this.rows = rows;
            else
                this.rows = yield sheet.getRows();
            const field = {
                key: this.key,
                type: this.type,
            };
            this.length = 0;
            for (const row of this.rows) {
                const key = row.get(this.key);
                if (key && filter(row)) {
                    this.push((0, utils_1.valueMapper)(row, field));
                }
            }
        });
    }
}
exports.default = ArraySchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWFycmF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVtYS1hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLG1DQUF1RjtBQUV2RixNQUFxQixXQUFnRCxTQUFRLEtBQWlCO0lBSTFGLFlBQVksR0FBVyxFQUFFLElBQXdDO1FBQzdELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLFFBQVEsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRUssSUFBSTs2REFBQyxLQUFpQyxFQUFFLFNBQWlCLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUE2QjtZQUNwRyxJQUFJLElBQUk7Z0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7O2dCQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXZDLE1BQU0sS0FBSyxHQUFxQztnQkFDNUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNsQixDQUFBO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUM3QixJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFLEtBQUssQ0FBUSxDQUFDLENBQUE7Z0JBQzdDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUE1QkQsOEJBNEJDIn0=