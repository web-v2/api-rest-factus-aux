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
exports.updateProducto = exports.fetchProductoById = exports.fetchProductoByName = exports.saveProducto = exports.getAllProductos = void 0;
const producto_model_1 = require("../models/producto.model");
const getAllProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, producto_model_1.getProductos)();
});
exports.getAllProductos = getAllProductos;
const saveProducto = (productoData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, producto_model_1.addProducto)(productoData);
});
exports.saveProducto = saveProducto;
const fetchProductoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, producto_model_1.findProductoByName)(name);
});
exports.fetchProductoByName = fetchProductoByName;
const fetchProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, producto_model_1.findProductoById)(id);
});
exports.fetchProductoById = fetchProductoById;
const updateProducto = (productoData) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield (0, producto_model_1.getProductos)();
    const productoIndex = productos.findIndex((c) => c.code_reference === productoData.code_reference);
    if (productoIndex === -1) {
        return null;
    }
    const producto = productos[productoIndex];
    const updatedProducto = Object.assign(Object.assign(Object.assign({}, producto), productoData), { name: productoData.name ? productoData.name.toUpperCase() : producto.name });
    // Actualiza la lista de productos
    productos[productoIndex] = updatedProducto;
    // Guarda la lista actualizada
    yield (0, producto_model_1.saveProductos)(productos);
    return updatedProducto;
});
exports.updateProducto = updateProducto;
