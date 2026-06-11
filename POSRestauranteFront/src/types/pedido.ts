export interface PedidoItem {
  id: string;
  productoId: string;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  notas?: string;
}

export interface Pedido {
  id: string;
  numero: string;
  estado: "NUEVO" | "EN_PREPARACION" | "LISTO" | "ENTREGADO" | "CANCELADO";

  tipo: string;

  total: number;

  mesaNumero?: string;

  clienteNombre?: string;

  clienteTelefono?: string;

  clienteDireccion?: string;

  items: PedidoItem[];

  createdAt: string;
}
