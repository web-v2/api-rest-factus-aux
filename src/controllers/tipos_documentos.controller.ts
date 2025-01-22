import { Request, Response } from "express";
import { getTiposDocumentos } from "../models/tipos_documentos.model";

export const obtenerTiposDocumentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const tiposDocumentos = await getTiposDocumentos();
    res.status(200).json(tiposDocumentos);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener los tipos de documentos." });
  }
};
