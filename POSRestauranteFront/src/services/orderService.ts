import { api } from "./api";

export const crearPedido = async (pedido: any) => {
  const response = await api.post("/pedidos", pedido);

  return response.data;
};

export const getPedidosActivos = async () => {
  const response = await api.get("/pedidos/activos");
  return response.data;
};
export const getPedidos = async () => {
  const response = await api.get("/pedidos");
  return response.data;
};

export const cambiarEstadoPedido = async (pedidoId: string, estado: string) => {
  const response = await api.patch(`/pedidos/${pedidoId}/estado`, {
    estado,
  });

  return response.data;
};

export const actualizarPedido = async (pedidoId: string, payload: any) => {
  const response = await api.put(`/pedidos/${pedidoId}`, payload);

  return response.data;
};
