import { api } from "./api";

export async function obtenerProductosIA(restauranteId: string) {
  const response = await api.get(`/predicciones/productos/${restauranteId}`);

  return response.data;
}

export async function obtenerInsumosIA(restauranteId: string) {
  const response = await api.get(`/predicciones/insumos/${restauranteId}`);

  return response.data;
}

export async function predecirVentas(productoId: string, dias: number) {
  const response = await api.get(
    `/predicciones/ventas/${productoId}?dias=${dias}`,
  );

  return response.data;
}

export async function predecirInventario(insumoId: string) {
  const response = await api.get(`/predicciones/inventario/${insumoId}`);

  return response.data;
}
