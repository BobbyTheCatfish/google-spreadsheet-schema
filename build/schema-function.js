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
class FunctionSchema extends collection_1.Collection {
    constructor(primaryKey, mapper) {
        super();
        this.mapper = mapper;
        this.rows = [];
        this.primaryKey = primaryKey;
    }
    load(sheet_1) {
        return __awaiter(this, arguments, void 0, function* (sheet, filter = () => true, useExistingData = false) {
            if (!useExistingData || sheet.rowCount === 0) {
                this.rows = yield sheet.getRows();
            }
            this.clear();
            for (const row of this.rows) {
                if (filter(row)) {
                    this.set(row.get(this.primaryKey), this.mapper(row));
                }
            }
        });
    }
}
exports.default = FunctionSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVtYS1mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNEQUFtRDtBQU1uRCxNQUFxQixjQUFrQixTQUFRLHVCQUFxQjtJQUtoRSxZQUFhLFVBQWtCLEVBQUUsTUFBaUI7UUFDOUMsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFSyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRyxLQUFLO1lBQzlGLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3hELENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUF2QkQsaUNBdUJDIn0=