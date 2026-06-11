import { api } from "./api";

export interface Insumo {
  proveedorId?: string;
  id: string;
  nombre: string;
  stockActual: number;
  stockCritico: number;
  stockMinimo: number;
  unidad: string;
  estado: "NORMAL" | "BAJO" | "CRITICO";

  proveedorNombre?: string;
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

export async function eliminarInsumo(id: string) {
  await api.delete(`/inventario/insumos/${id}`);
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
