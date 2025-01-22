import { Request, Response } from "express";
import { getMetodos } from "../models/metodos_pago.model";

export const obtenerMetodosPago = async (req: Request, res: Response): Promise<void> => {
  try {
    const metodos = await getMetodos();
    res.status(200).json(metodos);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener los metodos de pago." });
  }
};
