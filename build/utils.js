"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.innerValueMapper = exports.valueMapper = void 0;
function valueMapper(value, field) {
    var _a, _b;
    return (_b = (_a = innerValueMapper(value, field)) !== null && _a !== void 0 ? _a : field.defaultValue) !== null && _b !== void 0 ? _b : null;
}
exports.valueMapper = valueMapper;
function innerValueMapper(value, field) {
    switch (field.type) {
        case "number": {
            const num = parseFloat(value);
            if (isNaN(num))
                return null;
            return num;
        }
        case "boolean": return value.toUpperCase() === "TRUE" || value === true;
        case "string": return String(value);
        case "date": {
            const num = parseInt(value);
            if (!isNaN(num))
                return new Date(num);
            const date = new Date(value);
            if (isNaN(date.valueOf()))
                return null;
            return date;
        }
        default: throw new Error(`Unsupported type: ${field.type}`);
    }
}
exports.innerValueMapper = innerValueMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBd0JBLFNBQWdCLFdBQVcsQ0FBQyxLQUFVLEVBQUUsS0FBdUM7O0lBQzNFLE9BQU8sTUFBQSxNQUFBLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsbUNBQUksS0FBSyxDQUFDLFlBQVksbUNBQUksSUFBSSxDQUFBO0FBQ3ZFLENBQUM7QUFGRCxrQ0FFQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLEtBQVUsRUFBRSxLQUF1QztJQUNoRixRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFBO1lBQzNCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUNELEtBQUssU0FBUyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7UUFDeEUsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM1QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDdkMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7QUFDTCxDQUFDO0FBbEJELDRDQWtCQyJ9