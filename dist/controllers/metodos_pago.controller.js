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
exports.obtenerMetodosPago = void 0;
const metodos_pago_model_1 = require("../models/metodos_pago.model");
const fechas_utils_1 = require("../utils/fechas.utils");
const obtenerMetodosPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Listar metodos-pago');
        const metodos = yield (0, metodos_pago_model_1.getMetodos)();
        res.status(200).json(metodos);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error al obtener los metodos de pago." });
    }
});
exports.obtenerMetodosPago = obtenerMetodosPago;
