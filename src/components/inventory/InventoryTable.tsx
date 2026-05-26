import StockBadge from "./StockBadge";

const products = [
  {
    name: "Carne de Hamburguesa",
    stock: "25kg",
    minimum: "10kg",
    status: "high",
  },
  {
    name: "Pan Brioche",
    stock: "8 paquetes",
    minimum: "5 paquetes",
    status: "medium",
  },
  {
    name: "Queso Cheddar",
    stock: "2kg",
    minimum: "5kg",
    status: "low",
  },
  {
    name: "Papas",
    stock: "30kg",
    minimum: "10kg",
    status: "high",
  },
];

export default function InventoryTable() {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      overflow-hidden
    "
    >
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold">Inventario General</h2>

        <p className="text-sm text-slate-400 mt-1">
          Control inteligente de insumos.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr className="text-left">
              <th className="p-5 text-sm font-medium text-slate-400">
                Producto
              </th>

              <th className="p-5 text-sm font-medium text-slate-400">
                Stock Actual
              </th>

              <th className="p-5 text-sm font-medium text-slate-400">
                Stock Mínimo
              </th>

              <th className="p-5 text-sm font-medium text-slate-400">Estado</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.name}
                className="
                  border-t border-slate-800
                  hover:bg-slate-800/40
                  transition
                "
              >
                <td className="p-5 font-medium">{product.name}</td>

                <td className="p-5 text-slate-300">{product.stock}</td>

                <td className="p-5 text-slate-300">{product.minimum}</td>

                <td className="p-5">
                  <StockBadge
                    status={product.status as "high" | "medium" | "low"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
