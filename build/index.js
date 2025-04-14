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
const collection_1 = require("@discordjs/collection");
class Schema extends collection_1.Collection {
    constructor(primaryKey, mapper) {
        super();
        this.mapper = mapper;
        const defaultFilter = (r) => true;
        this.rows = [];
        this.primaryKey = primaryKey;
    }
    load(sheet_1) {
        return __awaiter(this, arguments, void 0, function* (sheet, filter = (r) => true, useExistingData = false) {
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
module.exports = Schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0Esc0RBQWtEO0FBSWxELE1BQU0sTUFBVSxTQUFRLHVCQUFxQjtJQUt6QyxZQUFhLFVBQWtCLEVBQUUsTUFBaUI7UUFDOUMsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixNQUFNLGFBQWEsR0FBRyxDQUFDLENBQXVCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTtRQUN2RCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFSyxJQUFJOzZEQUFDLEtBQWlDLEVBQUUsU0FBaUIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLEdBQUcsS0FBSztZQUMvRixJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEMsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNaLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUN4RCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNKO0FBRUQsaUJBQVMsTUFBTSxDQUFBIn0=