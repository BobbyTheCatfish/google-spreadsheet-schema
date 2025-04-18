"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueMapper = void 0;
function valueMapper(value, type) {
    switch (type) {
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
        default: throw new Error(`Unsupported type: ${type}`);
    }
}
exports.valueMapper = valueMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBY0EsU0FBZ0IsV0FBVyxDQUFDLEtBQVUsRUFBRSxJQUFtQjtJQUN2RCxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ1gsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUMzQixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRCxLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQ3hFLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7QUFDTCxDQUFDO0FBbEJELGtDQWtCQyJ9