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
exports.findClienteByName = exports.findClienteById = exports.addCliente = exports.saveClientes = exports.getClientes = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../db/clientes.json");
const getClientes = () => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getClientes = getClientes;
const saveClientes = (clientes) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_extra_1.default.writeJSON(filePath, clientes);
});
exports.saveClientes = saveClientes;
const addCliente = (cliente) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield (0, exports.getClientes)();
    const clienteExistente = clientes.find((cl) => cl.identification === cliente.identification);
    if (clienteExistente) {
        throw new Error("El cliente ya existe");
    }
    /**/
    cliente.names = cliente.names.toUpperCase();
    cliente.company = cliente.company ? cliente.company.toUpperCase() : "";
    cliente.trade_name = cliente.trade_name ? cliente.trade_name.toUpperCase() : "";
    clientes.push(cliente);
    yield (0, exports.saveClientes)(clientes);
    return cliente;
});
exports.addCliente = addCliente;
const findClienteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield (0, exports.getClientes)();
    return clientes.find((cl) => cl.identification === id + '');
});
exports.findClienteById = findClienteById;
const findClienteByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield (0, exports.getClientes)();
    return clientes.find((cl) => cl.names.toLowerCase() === name.toLowerCase());
});
exports.findClienteByName = findClienteByName;
