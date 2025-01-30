import fs from "fs-extra";
import path from "path";
import { Bill } from "../interfaces/bill.interface";

const filePath = path.join(__dirname, "../db/bills.json");

// Obtener todas las facturas
export const getBills = async (): Promise<Bill[]> => {
  if (!(await fs.pathExists(filePath))) {
    await fs.writeJSON(filePath, []);
  }
  const data = await fs.readJSON(filePath);
  return data as Bill[];
};

// Guardar todas las facturas
export const saveBills = async (bills: Bill[]): Promise<void> => {
  await fs.writeJSON(filePath, bills, { spaces: 2 });
};

// Encontrar factura por ID
export const findBillById = async (id: number): Promise<Bill | null> => {
  const bills = await getBills();
  return bills.find((bill) => bill.id === id) || null;
};

// Agregar nueva factura
export const addBill = async (newBill: Bill): Promise<Bill> => {
  const bills = await getBills();
  bills.push(newBill);
  await saveBills(bills);
  return newBill;
};
