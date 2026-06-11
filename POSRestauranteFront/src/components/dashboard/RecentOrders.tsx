interface Props {
  pedidos: any[];
}

export default function RecentOrders({ pedidos }: Props) {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
    "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold">Pedidos Recientes</h2>

        <p className="text-sm text-slate-400 mt-1">
          Últimos pedidos registrados.
        </p>
      </div>

      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="
              flex items-center justify-between
              p-4 rounded-2xl
              bg-slate-800
            "
          >
            <div>
              <h3 className="font-semibold">
                {pedido.clienteNombre || "Cliente"}
              </h3>

              <p className="text-sm text-slate-400">{pedido.numero}</p>
            </div>

            <div className="text-right">
              <h3 className="font-semibold">
                ${Number(pedido.total).toLocaleString("es-CO")}
              </h3>

              <p className="text-sm text-blue-400">{pedido.estado}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
