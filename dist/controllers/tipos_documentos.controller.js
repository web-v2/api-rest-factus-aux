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
exports.obtenerTiposDocumentos = void 0;
const tipos_documentos_model_1 = require("../models/tipos_documentos.model");
const obtenerTiposDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposDocumentos = yield (0, tipos_documentos_model_1.getTiposDocumentos)();
        res.status(200).json(tiposDocumentos);
    }
    catch (error) {
        res
            .status(500)
            .json({
            status: 500,
            message: "Error al obtener los tipos de documentos.",
        });
    }
});
exports.obtenerTiposDocumentos = obtenerTiposDocumentos;
