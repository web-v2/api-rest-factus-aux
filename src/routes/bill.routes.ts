import { Router } from "express";
import { listBills, createBill, getBillById } from "../controllers/bill.controller";

const router = Router();

router.get("/", listBills); // Obtener todas las facturas
router.post("/", createBill); // Crear nueva factura
router.get("/:id", getBillById); // Obtener factura por ID

export default router;
