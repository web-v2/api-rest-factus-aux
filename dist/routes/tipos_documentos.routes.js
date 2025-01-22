"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipos_documentos_controller_1 = require("../controllers/tipos_documentos.controller");
const router = (0, express_1.Router)();
router.get("/", tipos_documentos_controller_1.obtenerTiposDocumentos);
exports.default = router;
