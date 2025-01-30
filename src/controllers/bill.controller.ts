import { Request, Response } from "express";
import { getBills, addBill, findBillById } from "../models/bill.model";
import { Bill } from "../interfaces/bill.interface";
import { getFecha } from '../utils/fechas.utils'

// Obtener todas las facturas
export const listBills = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Listar Facturas');
    const bills = await getBills();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener facturas" });
  }
};

// Crear nueva factura
export const createBill = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Crear Factura');
    const bill: Bill = req.body;
    const bills = await getBills();

    // Generar ID único
    bill.id = bills.length ? bills[bills.length - 1].id + 1 : 1;

    // Agregar factura
    const newBill = await addBill(bill);
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al crear la factura" });
  }
};

// Obtener factura por ID
export const getBillById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Listar Factura By Id');
    const { id } = req.params;
    const bill = await findBillById(Number(id));

    if (!bill) {
      res.status(404).json({ status: 404, message: "Factura no encontrada" });
      return;
    }

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener la factura" });
  }
};
