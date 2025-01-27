"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cliente_routes_1 = __importDefault(require("./routes/cliente.routes"));
const producto_routes_1 = __importDefault(require("./routes/producto.routes"));
const metodos_pago_routes_1 = __importDefault(require("./routes/metodos_pago.routes"));
const file_utils_1 = require("./utils/file.utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Lista de orígenes permitidos
const allowedOrigins = [
    "http://localhost:4200",
    "https://www.netlify.com",
    "https://tekball-softvergara-921597.netlify.app",
    "https://netlify.app",
];
// Configuración de CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("No autorizado por CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
// Usa el middleware CORS
app.use((0, cors_1.default)(corsOptions));
app.get("/api", (req, res) => {
    res.json({ message: "API funcionando correctamente." });
});
app.use(body_parser_1.default.json());
app.use("/api/clientes", cliente_routes_1.default);
app.use("/api/productos", producto_routes_1.default);
app.use("/api/metodos-pago", metodos_pago_routes_1.default);
(0, file_utils_1.initializeConfigFile)()
    .then(() => {
    app.listen(port, () => {
        const mensaje = 'API FACTUS AUX';
        const borde = '*'.repeat(mensaje.length + 4);
        console.log(borde);
        console.log(`* ${mensaje} *`);
        console.log(borde);
        console.log(`Server running: http://localhost:${port}/api/`);
    });
})
    .catch((error) => {
    console.error("Error initializing config file", error);
});
