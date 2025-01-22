import { Producto } from "../interfaces/producto.interface";
import fs from "fs-extra";
import path from "path";

const filePath = path.join(__dirname, "../db/productos.json");

export const getProductos = async (): Promise<Producto[]> => {
  try {
    return await fs.readJSON(filePath);
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const errnoError = error as NodeJS.ErrnoException;
      if (errnoError.code === "ENOENT") {
        return []; // Si el archivo no existe, devuelve un array vacío
      }
    }
    throw error;
  }
};

export const saveProductos = async (productos: Producto[]): Promise<void> => {
  await fs.writeJSON(filePath, productos);
};


export const addProducto = async (producto: Producto): Promise<Producto> => {
  const productos = await getProductos();
  const productoExistente = productos.find((cl) => cl.code_reference === producto.code_reference);

  if (productoExistente) {
    throw new Error("El producto ya existe");
  }
  /**/
  producto.name = producto.name.toUpperCase();
  
  productos.push(producto);
  await saveProductos(productos);
  return producto;
};

export const findProductoById = async (id: string): Promise<Producto | undefined> => {
  const productos = await getProductos();
  return productos.find((cl) => cl.code_reference === id);   
};

export const findProductoByName = async (name: string): Promise<Producto | undefined> => {
  const productos = await getProductos();
  return productos.find((cl) => cl.name.toLowerCase() === name.toLowerCase());
};
