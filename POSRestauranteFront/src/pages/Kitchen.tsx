import { useEffect, useState } from "react";
import {
  getPedidosActivos,
  cambiarEstadoPedido,
} from "@/services/orderService";

import { Pedido } from "@/types/pedido";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Kitchen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const cargarPedidos = async () => {
    try {
      const data = await getPedidosActivos();

      setPedidos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const actualizarEstado = async (pedidoId: string, estado: string) => {
    try {
      await cambiarEstadoPedido(pedidoId, estado);

      toast.success("Estado actualizado");

      cargarPedidos();
    } catch (error) {
      console.error(error);

      toast.error("No fue posible actualizar");
    }
  };

  const estadoLabel = {
    NUEVO: "Nuevo",
    EN_PREPARACION: "En preparación",
    LISTO: "Listo",
    ENTREGADO: "Entregado",
    CANCELADO: "Cancelado",
  } as const;

  type EstadoPedido = keyof typeof estadoLabel;

  const getEstadosPermitidos = (estadoActual: EstadoPedido): EstadoPedido[] => {
    switch (estadoActual) {
      case "NUEVO":
        return ["EN_PREPARACION", "CANCELADO"];

      case "EN_PREPARACION":
        return ["LISTO", "CANCELADO"];

      case "LISTO":
        return ["ENTREGADO"];

      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Pedidos</h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
      >
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="
            bg-slate-900
            border border-slate-800
            rounded-3xl
            p-6
          "
          >
            <div className="mb-4">
              <h2 className="font-bold text-xl">{pedido.numero}</h2>

              <p className="text-slate-400">{pedido.tipo}</p>
            </div>

            {pedido.mesaNumero && <p>Mesa: {pedido.mesaNumero}</p>}

            {pedido.clienteNombre && (
              <>
                <p>Cliente: {pedido.clienteNombre}</p>

                <p>Tel: {pedido.clienteTelefono}</p>
              </>
            )}

            <div className="mt-4 space-y-2">
              {pedido.items.map((item) => (
                <div key={item.id}>
                  <strong>{item.cantidad}x</strong> {item.productoNombre}
                  {item.notas && (
                    <p
                      className="
                      text-xs
                      text-yellow-400
                    "
                    >
                      {item.notas}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Badge
                className={
                  pedido.estado === "NUEVO"
                    ? "bg-blue-500"
                    : pedido.estado === "EN_PREPARACION"
                      ? "bg-yellow-500"
                      : pedido.estado === "LISTO"
                        ? "bg-green-500"
                        : pedido.estado === "ENTREGADO"
                          ? "bg-slate-500"
                          : "bg-red-500"
                }
              >
                {estadoLabel[pedido.estado]}
              </Badge>
            </div>

            <div className="mt-4">
              <Select
                onValueChange={(value) => actualizarEstado(pedido.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Cambiar estado" />
                </SelectTrigger>

                <SelectContent>
                  {getEstadosPermitidos(pedido.estado).map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estadoLabel[estado]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
