import { Router } from "express";
import { obtenerTiposDocumentos } from "../controllers/tipos_documentos.controller";

const router = Router();

router.get("/", obtenerTiposDocumentos);

export default router;
