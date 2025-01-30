import { Request, Response } from "express";
import { getTiposDocumentos } from "../models/tipos_documentos.model";
import { getFecha } from '../utils/fechas.utils'

export const obtenerTiposDocumentos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(getFecha(),'->Listar tipos de documentos');
    const tiposDocumentos = await getTiposDocumentos();
    res.status(200).json(tiposDocumentos);
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "Error al obtener los tipos de documentos.",
      });
  }
};
