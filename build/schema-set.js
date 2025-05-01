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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const UtilSet_1 = __importDefault(require("./UtilSet"));
/**
 * A set based schema. Maps a column to values of a given type.
 */
class SetSchema extends UtilSet_1.default {
    /**
     * Creates a set based schema.
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
            this.clear();
            for (const row of this.rows) {
                const key = row.get(this.key);
                if (key && filter(row)) {
                    this.add((0, utils_1.valueMapper)(key, field));
                }
            }
        });
    }
}
exports.default = SetSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQXVGO0FBQ3ZGLHdEQUFnQztBQUVoQzs7R0FFRztBQUNILE1BQXFCLFNBQThDLFNBQVEsaUJBQW1CO0lBSTFGOzs7O09BSUc7SUFDSCxZQUFZLEdBQVcsRUFBRSxJQUF3QztRQUM3RCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxRQUFRLENBQUE7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0csSUFBSTs2REFBQyxLQUFpQyxFQUFFLFNBQWlCLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUE2QjtZQUNwRyxJQUFJLElBQUk7Z0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7O2dCQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXZDLE1BQU0sS0FBSyxHQUFxQztnQkFDNUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNsQixDQUFBO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUM3QixJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFLEtBQUssQ0FBUSxDQUFDLENBQUE7Z0JBQzVDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUF2Q0QsNEJBdUNDIn0=