"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFecha = void 0;
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
