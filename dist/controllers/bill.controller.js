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
exports.getBillById = exports.createBill = exports.listBills = void 0;
const bill_model_1 = require("../models/bill.model");
const fechas_utils_1 = require("../utils/fechas.utils");
// Obtener todas las facturas
const listBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Listar Facturas');
        const bills = yield (0, bill_model_1.getBills)();
        res.status(200).json(bills);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error al obtener facturas" });
    }
});
exports.listBills = listBills;
// Crear nueva factura
const createBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Crear Factura');
        const bill = req.body;
        const bills = yield (0, bill_model_1.getBills)();
        // Generar ID único
        bill.id = bills.length ? bills[bills.length - 1].id + 1 : 1;
        // Agregar factura
        const newBill = yield (0, bill_model_1.addBill)(bill);
        res.status(201).json(newBill);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error al crear la factura" });
    }
});
exports.createBill = createBill;
// Obtener factura por ID
const getBillById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Listar Factura By Id');
        const { id } = req.params;
        const bill = yield (0, bill_model_1.findBillById)(Number(id));
        if (!bill) {
            res.status(404).json({ status: 404, message: "Factura no encontrada" });
            return;
        }
        res.status(200).json(bill);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error al obtener la factura" });
    }
});
exports.getBillById = getBillById;
