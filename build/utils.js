"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.innerValueMapper = exports.valueMapper = void 0;
function valueMapper(value, field) {
    var _a;
    return (_a = (innerValueMapper(value, field) || field.defaultValue)) !== null && _a !== void 0 ? _a : null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBdUJBLFNBQWdCLFdBQVcsQ0FBQyxLQUFVLEVBQUUsS0FBdUM7O0lBQzNFLE9BQU8sTUFBQSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLG1DQUFJLElBQUksQ0FBQTtBQUN6RSxDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFVLEVBQUUsS0FBdUM7SUFDaEYsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUMzQixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRCxLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQ3hFLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0FBQ0wsQ0FBQztBQWxCRCw0Q0FrQkMifQ==