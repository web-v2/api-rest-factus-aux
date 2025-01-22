"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metodos_pago_controller_1 = require("../controllers/metodos_pago.controller");
const router = (0, express_1.Router)();
router.get("/", metodos_pago_controller_1.obtenerMetodosPago);
exports.default = router;
