import { Request, Response } from 'express';
import { getAllProductos, saveProducto, fetchProductoByName, fetchProductoById, updateProducto } from '../services/producto.service';

export const crearProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Crear producto');
    const producto = await saveProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 400, message: error.message });
    }else{      
      res.status(400).json({ status: 400, message: "Error desconocido" });
    }
  }
};

export const listProductos = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Listar productos');
    const productos = await getAllProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener los productos" });
  }
};

export const productoById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Find producto by Id');
    const id = req.params.id;       
    res.status(400).json({ status: 400, message: "El ID proporcionado no es válido." });          
    const producto = await fetchProductoById(id);
    if (!producto) {      
      res.status(404).json({ status: 404, message: "Producto no encontrado con este ID." });
      return;
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error interno del servidor." });
  }
};

export const productoByName = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Find producto by Name');
    const { name } = req.params;
    const producto = await fetchProductoByName(name);
    if (!producto) {      
      res.status(404).json({ status: 404, message: "Producto no encontrado con este Nombre." });
      return;
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error interno del servidor." });
  }
};


export const productoUpdate = async (req: Request, res: Response): Promise<void> => {
  console.log(getFecha(),'->Actualizar producto');
  try {
    const { code_reference } = req.body;
    if (!code_reference) {
      res.status(400).json({ status: 400, message: "ID del producto es requerido" });
      return;
    }

    const updatedProducto = await updateProducto(req.body);

    if (updatedProducto) {
      res.status(200).json(updatedProducto);
    } else {
      res.status(404).json({ status: 404, message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al actualizar el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getFecha = ():string => {
  const fecha = new Date();
  const offset = -5 * 60; // UTC-5 en minutos
  const utcFecha = new Date(fecha.getTime() + offset * 60000);
  const year = utcFecha.getUTCFullYear();
  const month = (utcFecha.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = utcFecha.getUTCDate().toString().padStart(2, '0');
  const hours = utcFecha.getUTCHours().toString().padStart(2, '0');
  const minutes = utcFecha.getUTCMinutes().toString().padStart(2, '0');
  const seconds = utcFecha.getUTCSeconds().toString().padStart(2, '0');

  // Mostrar la fecha formateada en UTC-5
  const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return fechaFormateada;
};