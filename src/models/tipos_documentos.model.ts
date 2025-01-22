import fs from "fs-extra";
import path from "path";

const filePath = path.join(__dirname, "../db/tipo_documentos.json");

export const getTiposDocumentos = async (): Promise<{ ID: number; Nombre: string }[]> => {
  try {
    if (!(await fs.pathExists(filePath))) {
      throw new Error("El archivo tipos_documentos.json no existe.");
    }
    return await fs.readJSON(filePath);
  } catch (error) {
    console.error("Error al leer el archivo tipos_documentos:", error);
    return [];
  }
};
