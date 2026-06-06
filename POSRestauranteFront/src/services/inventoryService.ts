import { api } from "./api";

export interface Insumo {
  id: string;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  stockCritico: number;
  unidad: string;
  estado: "NORMAL" | "BAJO" | "CRITICO";
}

export interface InsumoRequest {
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  stockCritico: number;
  unidad: string;
}

export async function getInsumos(): Promise<Insumo[]> {
  const response = await api.get("/inventario/insumos");
  return response.data;
}

export async function getAlertas(): Promise<Insumo[]> {
  const response = await api.get("/inventario/alertas");
  return response.data;
}

export async function crearInsumo(insumo: InsumoRequest): Promise<Insumo> {
  const response = await api.post("/inventario/insumos", insumo);
  return response.data;
}

export async function actualizarInsumo(
  id: string,
  insumo: InsumoRequest,
): Promise<Insumo> {
  const response = await api.put(`/inventario/insumos/${id}`, insumo);

  return response.data;
}

export async function ajustarStock(
  id: string,
  cantidad: number,
  motivo: string,
): Promise<Insumo> {
  const response = await api.patch(`/inventario/insumos/${id}/ajustar`, {
    cantidad,
    motivo,
  });

  return response.data;
}
