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
/**
 * An array based schema. Maps a column to values of a given type.
 */
class ArraySchema extends Array {
    /**
     * Creates an array based schema.
     * @param key The column name
     * @param type The type of content in the cell
     */
    constructor(key, type) {
        super();
        this.key = key;
        this.type = type !== null && type !== void 0 ? type : "string";
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
            const field = {
                key: this.key,
                type: this.type,
            };
            this.length = 0;
            for (const row of this.rows) {
                const key = row.get(this.key);
                if (key && filter(row)) {
                    this.push((0, utils_1.valueMapper)(key, field));
                }
            }
        });
    }
}
exports.default = ArraySchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWFycmF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVtYS1hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLG1DQUF1RjtBQUV2Rjs7R0FFRztBQUNILE1BQXFCLFdBQWdELFNBQVEsS0FBaUI7SUFJMUY7Ozs7T0FJRztJQUNILFlBQVksR0FBVyxFQUFFLElBQXdDO1FBQzdELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLFFBQVEsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDRyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQTZCO1lBQ3BHLElBQUksSUFBSTtnQkFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTs7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkMsTUFBTSxLQUFLLEdBQXFDO2dCQUM1QyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2xCLENBQUE7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzdCLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVcsRUFBQyxHQUFHLEVBQUUsS0FBSyxDQUFRLENBQUMsQ0FBQTtnQkFDN0MsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQXZDRCw4QkF1Q0MifQ==