const orders = [
  {
    id: "#1024",
    customer: "Carlos Pérez",
    total: "$85.000",
    status: "Completado",
  },
  {
    id: "#1025",
    customer: "María López",
    total: "$120.000",
    status: "Pendiente",
  },
  {
    id: "#1026",
    customer: "Juan Gómez",
    total: "$64.000",
    status: "Preparando",
  },
];

export default function RecentOrders() {
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
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              flex items-center justify-between
              p-4 rounded-2xl
              bg-slate-800
            "
          >
            <div>
              <h3 className="font-semibold">{order.customer}</h3>

              <p className="text-sm text-slate-400">{order.id}</p>
            </div>

            <div className="text-right">
              <h3 className="font-semibold">{order.total}</h3>

              <p className="text-sm text-blue-400">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
