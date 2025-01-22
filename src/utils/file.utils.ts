import path from "path";
import fs from "fs-extra";


const filePaths = {
  clientes: path.resolve(__dirname, "../db/clientes.json"),
  productos: path.resolve(__dirname, "../db/productos.json"),
};

/**
 * Inicializa los archivos de configuración si no existen.
 */
export const initializeConfigFile = async (): Promise<void> => {
  try {
    for (const [key, filePath] of Object.entries(filePaths)) {
      if (!(await fs.pathExists(filePath))) {
        console.log(`Inicializando archivo: ${key}`);
        await fs.writeJSON(filePath, []); // Inicializa con un array vacío
      }
    }
  } catch (error) {
    console.error("Error al inicializar los archivos de configuración:", error);
    throw error;
  }
};
