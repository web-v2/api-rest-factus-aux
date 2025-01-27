import { Cliente } from "../interfaces/cliente.interface";
import fs from "fs-extra";
import path from "path";

const filePath = path.join(__dirname, "../db/clientes.json");

export const getClientes = async (): Promise<Cliente[]> => {
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

export const saveClientes = async (clientes: Cliente[]): Promise<void> => {
  await fs.writeJSON(filePath, clientes);
};


export const addCliente = async (cliente: Cliente): Promise<Cliente> => {
  const clientes = await getClientes();
  const clienteExistente = clientes.find((cl) => cl.identification === cliente.identification);

  if (clienteExistente) {
    throw new Error("El cliente ya existe");
  }
  /**/
  cliente.names = cliente.names.toUpperCase();
  cliente.company = cliente.company ? cliente.company.toUpperCase() : "";
  cliente.trade_name = cliente.trade_name ? cliente.trade_name.toUpperCase() : "";
  
  clientes.push(cliente);
  await saveClientes(clientes);
  return cliente;
};

export const findClienteById = async (id: string): Promise<Cliente | undefined> => {
  const clientes = await getClientes();
  return clientes.find((cl) => cl.identification === id+'');   
};

export const findClienteByName = async (name: string): Promise<Cliente | undefined> => {
  const clientes = await getClientes();
  return clientes.find((cl) => cl.names.toLowerCase() === name.toLowerCase());
};
