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
exports.addBill = exports.findBillById = exports.saveBills = exports.getBills = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../db/bills.json");
// Obtener todas las facturas
const getBills = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield fs_extra_1.default.pathExists(filePath))) {
        yield fs_extra_1.default.writeJSON(filePath, []);
    }
    const data = yield fs_extra_1.default.readJSON(filePath);
    return data;
});
exports.getBills = getBills;
// Guardar todas las facturas
const saveBills = (bills) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_extra_1.default.writeJSON(filePath, bills, { spaces: 2 });
});
exports.saveBills = saveBills;
// Encontrar factura por ID
const findBillById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bills = yield (0, exports.getBills)();
    return bills.find((bill) => bill.id === id) || null;
});
exports.findBillById = findBillById;
// Agregar nueva factura
const addBill = (newBill) => __awaiter(void 0, void 0, void 0, function* () {
    const bills = yield (0, exports.getBills)();
    bills.push(newBill);
    yield (0, exports.saveBills)(bills);
    return newBill;
});
exports.addBill = addBill;
