import { Producto } from "../interfaces/producto.interface";
import { addProducto,  getProductos,  findProductoByName, findProductoById, saveProductos } from "../models/producto.model";

export const getAllProductos = async (): Promise<Producto[]> => {
  return await getProductos();
};

export const saveProducto = async (productoData: Producto): Promise<Producto> => {
  return await addProducto(productoData);
};

export const fetchProductoByName = async (name: string): Promise<Producto | undefined> => {
  return await findProductoByName(name);
};

export const fetchProductoById = async (id: string): Promise<Producto | undefined> => {
  return await findProductoById(id);
};

export const updateProducto = async (productoData: Partial<Producto>): Promise<Producto | null> => {
  const productos = await getProductos();

  const productoIndex = productos.findIndex((c) => c.code_reference === productoData.code_reference);

  if (productoIndex === -1) {
    return null;
  }

  
  const producto = productos[productoIndex];
  const updatedProducto: Producto = {
    ...producto,
    ...productoData,
    name: productoData.name ? productoData.name.toUpperCase() : producto.name
  };

  // Actualiza la lista de productos
  productos[productoIndex] = updatedProducto;

  // Guarda la lista actualizada
  await saveProductos(productos);

  return updatedProducto;
};