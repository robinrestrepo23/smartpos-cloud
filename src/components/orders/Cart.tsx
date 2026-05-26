const items = [
  {
    name: "Hamburguesa BBQ",
    qty: 2,
    price: "$48.000",
  },
  {
    name: "Papas Grandes",
    qty: 1,
    price: "$12.000",
  },
];

export default function Cart() {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
      h-fit
      sticky top-6
    "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Pedido Actual</h2>

        <p className="text-sm text-slate-400 mt-1">Resumen del pedido.</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="
              bg-slate-800
              rounded-2xl
              p-4
              flex items-center justify-between
            "
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>

              <p className="text-sm text-slate-400">Cantidad: {item.qty}</p>
            </div>

            <h3 className="font-semibold">{item.price}</h3>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <p className="text-slate-400">Total</p>

          <h2 className="text-2xl font-bold">$60.000</h2>
        </div>

        <button
          className="
          mt-6 w-full h-12
          rounded-2xl
          bg-green-500
          hover:bg-green-400
          transition
          font-semibold
          text-slate-900
        "
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
