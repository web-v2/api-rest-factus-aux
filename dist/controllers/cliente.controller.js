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
exports.getFecha = exports.clienteUpdate = exports.clienteByName = exports.clienteById = exports.listClientes = exports.crearCliente = void 0;
const cliente_service_1 = require("../services/cliente.service");
const crearCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, exports.getFecha)(), '->Crear cliente');
        const cliente = yield (0, cliente_service_1.saveCliente)(req.body);
        res.status(201).json(cliente);
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
exports.crearCliente = crearCliente;
const listClientes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, exports.getFecha)(), '->Listar clientes');
        const clientes = yield (0, cliente_service_1.getAllClientes)();
        res.status(200).json(clientes);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error al obtener los clientes" });
    }
});
exports.listClientes = listClientes;
const clienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, exports.getFecha)(), '->Find cliente by Id');
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ status: 400, message: "El ID proporcionado no es válido." });
            return;
        }
        const cliente = yield (0, cliente_service_1.fetchClienteById)(id);
        if (!cliente) {
            res.status(404).json({ status: 404, message: "Cliente no encontrado con este ID." });
            return;
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error interno del servidor." });
    }
});
exports.clienteById = clienteById;
const clienteByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, exports.getFecha)(), '->Find cliente by Name');
        const { name } = req.params;
        const cliente = yield (0, cliente_service_1.fetchClienteByName)(name);
        if (!cliente) {
            res.status(404).json({ status: 404, message: "Cliente no encontrado con este Nombre." });
            return;
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Error interno del servidor." });
    }
});
exports.clienteByName = clienteByName;
const clienteUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log((0, exports.getFecha)(), '->Actualizar cliente');
    try {
        const { identification } = req.body;
        if (!identification) {
            res.status(400).json({ status: 400, message: "ID del cliente es requerido" });
            return;
        }
        const updatedCliente = yield (0, cliente_service_1.updateCliente)(req.body);
        if (updatedCliente) {
            res.status(200).json(updatedCliente);
        }
        else {
            res.status(404).json({ status: 404, message: "Cliente no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error al actualizar el cliente",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.clienteUpdate = clienteUpdate;
const getFecha = () => {
    const fecha = new Date();
    const offset = -5 * 60; // UTC-5 en minutos
    const utcFecha = new Date(fecha.getTime() + offset * 60000);
    const year = utcFecha.getUTCFullYear();
    const month = (utcFecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = utcFecha.getUTCDate().toString().padStart(2, '0');
    const hours = utcFecha.getUTCHours().toString().padStart(2, '0');
    const minutes = utcFecha.getUTCMinutes().toString().padStart(2, '0');
    const seconds = utcFecha.getUTCSeconds().toString().padStart(2, '0');
    // Mostrar la fecha formateada en UTC-5
    const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return fechaFormateada;
};
exports.getFecha = getFecha;
