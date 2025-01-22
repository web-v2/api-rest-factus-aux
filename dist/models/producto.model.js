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
exports.findProductoByName = exports.findProductoById = exports.addProducto = exports.saveProductos = exports.getProductos = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../db/productos.json");
const getProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield fs_extra_1.default.readJSON(filePath);
    }
    catch (error) {
        if (error instanceof Error && "code" in error) {
            const errnoError = error;
            if (errnoError.code === "ENOENT") {
                return []; // Si el archivo no existe, devuelve un array vacío
            }
        }
        throw error;
    }
});
exports.getProductos = getProductos;
const saveProductos = (productos) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_extra_1.default.writeJSON(filePath, productos);
});
exports.saveProductos = saveProductos;
const addProducto = (producto) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield (0, exports.getProductos)();
    const productoExistente = productos.find((cl) => cl.code_reference === producto.code_reference);
    if (productoExistente) {
        throw new Error("El producto ya existe");
    }
    /**/
    producto.name = producto.name.toUpperCase();
    productos.push(producto);
    yield (0, exports.saveProductos)(productos);
    return producto;
});
exports.addProducto = addProducto;
const findProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield (0, exports.getProductos)();
    return productos.find((cl) => cl.code_reference === id);
});
exports.findProductoById = findProductoById;
const findProductoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield (0, exports.getProductos)();
    return productos.find((cl) => cl.name.toLowerCase() === name.toLowerCase());
});
exports.findProductoByName = findProductoByName;
