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
exports.getTiposDocumentos = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../db/tipo_documentos.json");
const getTiposDocumentos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield fs_extra_1.default.pathExists(filePath))) {
            throw new Error("El archivo tipos_documentos.json no existe.");
        }
        return yield fs_extra_1.default.readJSON(filePath);
    }
    catch (error) {
        console.error("Error al leer el archivo tipos_documentos:", error);
        return [];
    }
});
exports.getTiposDocumentos = getTiposDocumentos;
