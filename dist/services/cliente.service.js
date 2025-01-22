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
exports.updateCliente = exports.fetchClienteById = exports.fetchClienteByName = exports.saveCliente = exports.getAllClientes = void 0;
const cliente_model_1 = require("../models/cliente.model");
const getAllClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, cliente_model_1.getClientes)();
});
exports.getAllClientes = getAllClientes;
const saveCliente = (clienteData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, cliente_model_1.addCliente)(clienteData);
});
exports.saveCliente = saveCliente;
const fetchClienteByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, cliente_model_1.findClienteByName)(name);
});
exports.fetchClienteByName = fetchClienteByName;
const fetchClienteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, cliente_model_1.findClienteById)(id);
});
exports.fetchClienteById = fetchClienteById;
const updateCliente = (clienteData) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield (0, cliente_model_1.getClientes)(); // Aquí `clientes` es Cliente[]
    const clienteIndex = clientes.findIndex((c) => c.identification === clienteData.identification);
    if (clienteIndex === -1) {
        return null; // Cliente no encontrado
    }
    // Actualiza el cliente existente con los nuevos datos
    const cliente = clientes[clienteIndex];
    const updatedCliente = Object.assign(Object.assign(Object.assign({}, cliente), clienteData), { names: clienteData.names ? clienteData.names.toUpperCase() : cliente.names, company: clienteData.company ? clienteData.company.toUpperCase() : cliente.company, trade_name: clienteData.trade_name ? clienteData.trade_name.toUpperCase() : cliente.trade_name });
    // Actualiza la lista de clientes
    clientes[clienteIndex] = updatedCliente;
    // Guarda la lista actualizada
    yield (0, cliente_model_1.saveClientes)(clientes); // Aquí `clientes` es Cliente[]
    return updatedCliente;
});
exports.updateCliente = updateCliente;
