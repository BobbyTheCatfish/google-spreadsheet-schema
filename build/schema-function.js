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
 * A schema that relies on a function to map the values
 */
class FunctionSchema extends collection_1.Collection {
    /**
     * Creates a function based schema.
     * @param primaryKey The column name to use as the collection key
     * @param schema A function that takes a GoogleSpreadsheetRow and returns the parsed value
     */
    constructor(primaryKey, mapper, keyType = "string") {
        super();
        this.mapper = mapper;
        this.rows = [];
        this.primaryKey = primaryKey;
        this.keyType = keyType !== null && keyType !== void 0 ? keyType : "string";
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
            this.clear();
            for (const row of this.rows) {
                const key = row.get(this.primaryKey);
                if (key && filter(row)) {
                    this.set((0, utils_1.valueMapper)(key, { key: key, type: this.keyType }), this.mapper(row));
                }
            }
        });
    }
}
exports.default = FunctionSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVtYS1mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNEQUFtRDtBQUVuRCxtQ0FBbUU7QUFPbkU7O0dBRUc7QUFDSCxNQUFxQixjQUE4RCxTQUFRLHVCQUF1RTtJQU05Sjs7OztPQUlHO0lBQ0gsWUFBYSxVQUFrQixFQUFFLE1BQWlCLEVBQUUsVUFBYSxRQUFhO1FBQzFFLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLFFBQVEsQ0FBQTtJQUN0QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDRyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQTZCO1lBQ3BHLElBQUksSUFBSTtnQkFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTs7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUNwQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUN6RixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNKO0FBckNELGlDQXFDQyJ9