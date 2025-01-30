"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bill_controller_1 = require("../controllers/bill.controller");
const router = (0, express_1.Router)();
router.get("/", bill_controller_1.listBills); // Obtener todas las facturas
router.post("/", bill_controller_1.createBill); // Crear nueva factura
router.get("/:id", bill_controller_1.getBillById); // Obtener factura por ID
exports.default = router;
