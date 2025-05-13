"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.innerValueMapper = exports.valueMapper = void 0;
function valueMapper(value, field) {
    var _a;
    const v = innerValueMapper(value, field);
    if (v === "" || v === null)
        return (_a = field.defaultValue) !== null && _a !== void 0 ? _a : null;
    return v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBa0NBLFNBQWdCLFdBQVcsQ0FBQyxLQUFVLEVBQUUsS0FBdUM7O0lBQzNFLE1BQU0sQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUk7UUFBRSxPQUFPLE1BQUEsS0FBSyxDQUFDLFlBQVksbUNBQUksSUFBSSxDQUFDO0lBQzlELE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQUpELGtDQUlDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBVSxFQUFFLEtBQXVDO0lBQ2hGLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3hELFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFDM0IsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBQ0QsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztRQUN4RSxLQUFLLFFBQVEsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzVCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztBQUNMLENBQUM7QUFuQkQsNENBbUJDIn0=