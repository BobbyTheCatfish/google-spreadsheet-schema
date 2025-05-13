"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.innerValueMapper = exports.valueMapper = void 0;
function valueMapper(value, field) {
    var _a, _b;
    return (_b = ((_a = innerValueMapper(value, field)) !== null && _a !== void 0 ? _a : field.defaultValue)) !== null && _b !== void 0 ? _b : null;
}
exports.valueMapper = valueMapper;
function innerValueMapper(value, field) {
    if (value === undefined || value === null)
        return value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBa0NBLFNBQWdCLFdBQVcsQ0FBQyxLQUFVLEVBQUUsS0FBdUM7O0lBQzNFLE9BQU8sTUFBQSxDQUFDLE1BQUEsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxtQ0FBSSxLQUFLLENBQUMsWUFBWSxDQUFDLG1DQUFJLElBQUksQ0FBQTtBQUN6RSxDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFVLEVBQUUsS0FBdUM7SUFDaEYsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDeEQsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUMzQixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRCxLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQ3hFLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0FBQ0wsQ0FBQztBQW5CRCw0Q0FtQkMifQ==