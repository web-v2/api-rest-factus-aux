import { Cliente } from "../interfaces/cliente.interface";
import { addCliente,  getClientes,  findClienteByName, findClienteById, saveClientes } from "../models/cliente.model";

export const getAllClientes = async (): Promise<Cliente[]> => {
  return await getClientes();
};

export const saveCliente = async (clienteData: Cliente): Promise<Cliente> => {
  return await addCliente(clienteData);
};

export const fetchClienteByName = async (name: string): Promise<Cliente | undefined> => {
  return await findClienteByName(name);
};

export const fetchClienteById = async (id: string): Promise<Cliente | undefined> => {
  return await findClienteById(id);
};

export const updateCliente = async (clienteData: Partial<Cliente>): Promise<Cliente | null> => {
  const clientes = await getClientes(); // Aquí `clientes` es Cliente[]

  const clienteIndex = clientes.findIndex((c) => c.identification === clienteData.identification);

  if (clienteIndex === -1) {
    return null; // Cliente no encontrado
  }

  // Actualiza el cliente existente con los nuevos datos
  const cliente = clientes[clienteIndex];
  const updatedCliente: Cliente = {
    ...cliente,
    ...clienteData,
    names: clienteData.names ? clienteData.names.toUpperCase() : cliente.names,
    company: clienteData.company ? clienteData.company.toUpperCase() : cliente.company,
    trade_name: clienteData.trade_name ? clienteData.trade_name.toUpperCase() : cliente.trade_name,
  };

  // Actualiza la lista de clientes
  clientes[clienteIndex] = updatedCliente;

  // Guarda la lista actualizada
  await saveClientes(clientes); // Aquí `clientes` es Cliente[]

  return updatedCliente;
};