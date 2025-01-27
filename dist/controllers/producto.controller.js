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
exports.productoUpdate = exports.productoByName = exports.productoById = exports.listProductos = exports.crearProducto = void 0;
const producto_service_1 = require("../services/producto.service");
const fechas_utils_1 = require("../utils/fechas.utils");
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Crear producto');
        const producto = yield (0, producto_service_1.saveProducto)(req.body);
        res.status(201).json(producto);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 400, message: error.message });
        }
        else {
            res.status(400).json({ status: 400, message: "Error desconocido" });
        }
    }
});
exports.crearProducto = crearProducto;
const listProductos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Listar productos');
        const productos = yield (0, producto_service_1.getAllProductos)();
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error al obtener los productos" });
    }
});
exports.listProductos = listProductos;
const productoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Find producto by Id');
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ status: 400, message: "El ID proporcionado no es válido." });
            return;
        }
        const producto = yield (0, producto_service_1.fetchProductoById)(id);
        if (!producto) {
            res.status(404).json({ status: 404, message: "Producto no encontrado con este ID." });
            return;
        }
        res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error interno del servidor." });
    }
});
exports.productoById = productoById;
const productoByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, fechas_utils_1.getFecha)(), '->Find producto by Name');
        const { name } = req.params;
        const producto = yield (0, producto_service_1.fetchProductoByName)(name);
        if (!producto) {
            res.status(404).json({ status: 404, message: "Producto no encontrado con este Nombre." });
            return;
        }
        res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error interno del servidor." });
    }
});
exports.productoByName = productoByName;
const productoUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log((0, fechas_utils_1.getFecha)(), '->Actualizar producto');
    try {
        const { code_reference } = req.body;
        if (!code_reference) {
            res.status(400).json({ status: 400, message: "ID del producto es requerido" });
            return;
        }
        const updatedProducto = yield (0, producto_service_1.updateProducto)(req.body);
        if (updatedProducto) {
            res.status(200).json(updatedProducto);
        }
        else {
            res.status(404).json({ status: 404, message: "Producto no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error al actualizar el producto",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.productoUpdate = productoUpdate;
