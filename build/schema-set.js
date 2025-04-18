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
class SetSchema extends UtilSet_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEtc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQXVGO0FBQ3ZGLHdEQUFnQztBQUVoQyxNQUFxQixTQUE4QyxTQUFRLGlCQUFtQjtJQUkxRixZQUFZLEdBQVcsRUFBRSxJQUF3QztRQUM3RCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxRQUFRLENBQUE7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVLLElBQUk7NkRBQUMsS0FBaUMsRUFBRSxTQUFpQixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBNkI7WUFDcEcsSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBOztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV2QyxNQUFNLEtBQUssR0FBcUM7Z0JBQzVDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbEIsQ0FBQTtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDN0IsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBQSxtQkFBVyxFQUFDLEdBQUcsRUFBRSxLQUFLLENBQVEsQ0FBQyxDQUFBO2dCQUM1QyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNKO0FBNUJELDRCQTRCQyJ9