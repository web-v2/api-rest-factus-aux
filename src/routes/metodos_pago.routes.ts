import { Router } from "express";
import { obtenerMetodosPago } from "../controllers/metodos_pago.controller";

const router = Router();

router.get("/", obtenerMetodosPago);

export default router;
