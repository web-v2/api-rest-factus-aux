import fs from "fs-extra";
import path from "path";

const filePath = path.join(__dirname, "../db/metodos_pago.json");

export const getMetodos = async (): Promise<{ Código: number; Nombre: string }[]> => {
  try {
    if (!(await fs.pathExists(filePath))) {
      throw new Error("El archivo metodos_pago.json no existe.");
    }
    return await fs.readJSON(filePath);
  } catch (error) {
    console.error("Error al leer el archivo metodos_pago:", error);
    return [];
  }
};
