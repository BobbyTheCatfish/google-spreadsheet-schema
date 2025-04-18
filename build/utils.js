"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueMapper = void 0;
function valueMapper(value, type) {
    switch (type) {
        case "number": return parseFloat(value);
        case "boolean": return value.toUpperCase() === "TRUE" || value === true;
        case "string": return String(value);
        case "date": return new Date(value);
        default: throw new Error(`Unsupported type: ${type}`);
    }
}
exports.valueMapper = valueMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBY0EsU0FBZ0IsV0FBVyxDQUFDLEtBQVUsRUFBRSxJQUFtQjtJQUN2RCxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ1gsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQ3hFLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztBQUNMLENBQUM7QUFSRCxrQ0FRQyJ9