import { api } from "./api";

export const crearPedido = async (pedido: any) => {
  const response = await api.post("/pedidos", pedido);

  return response.data;
};
