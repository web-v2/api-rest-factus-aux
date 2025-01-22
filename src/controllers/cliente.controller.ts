import { Request, Response } from 'express';
import { getAllClientes, saveCliente, fetchClienteByName, fetchClienteById, updateCliente } from '../services/cliente.service';

export const crearCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Crear cliente');
    const cliente = await saveCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 400, message: error.message });
    }else{      
      res.status(400).json({ status: 400, message: "Error desconocido" });
    }
  }
};

export const listClientes = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Listar clientes');
    const clientes = await getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error al obtener los clientes" });
  }
};

export const clienteById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Find cliente by Id');
    const id = parseInt(req.params.id);
     if (isNaN(id)) {  
      res.status(400).json({ status: 400, message: "El ID proporcionado no es válido." });
      return;
     }
    const cliente = await fetchClienteById(id);
    if (!cliente) {      
      res.status(404).json({ status: 404, message: "Cliente no encontrado con este ID." });
      return;
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error interno del servidor." });
  }
};

export const clienteByName = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(getFecha(),'->Find cliente by Name');
    const { name } = req.params;
    const cliente = await fetchClienteByName(name);
    if (!cliente) {      
      res.status(404).json({ status: 404, message: "Cliente no encontrado con este Nombre." });
      return;
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error interno del servidor." });
  }
};


export const clienteUpdate = async (req: Request, res: Response): Promise<void> => {
  console.log(getFecha(),'->Actualizar cliente');
  try {
    const { identification } = req.body;
    if (!identification) {
      res.status(400).json({ status: 400, message: "ID del cliente es requerido" });
      return;
    }

    const updatedCliente = await updateCliente(req.body);

    if (updatedCliente) {
      res.status(200).json(updatedCliente);
    } else {
      res.status(404).json({ status: 404, message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al actualizar el cliente",
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