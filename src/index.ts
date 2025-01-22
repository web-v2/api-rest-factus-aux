import express from "express";
import bodyParser from "body-parser";
import clienteRoutes from "./routes/cliente.routes";
import productoRoutes from "./routes/producto.routes";
import { initializeConfigFile } from "./utils/file.utils";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Lista de orígenes permitidos
const allowedOrigins = [
  "http://localhost:4200",
  "https://www.netlify.com",
  "https://tekball-softvergara-921597.netlify.app",
  "https://netlify.app",
];

// Configuración de CORS
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No autorizado por CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};

// Usa el middleware CORS
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ message: "API funcionando correctamente." });
});

app.use(bodyParser.json());
app.use("/api/clientes", clienteRoutes);
app.use("/api/productos", productoRoutes);

initializeConfigFile()
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
