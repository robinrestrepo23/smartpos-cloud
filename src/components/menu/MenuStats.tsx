import { UtensilsCrossed, CircleDollarSign, Flame } from "lucide-react";

export default function MenuStats() {
  return (
    <div
      className="
      grid grid-cols-1
      md:grid-cols-3
      gap-6
    "
    >
      <div
        className="
        bg-slate-900
        border border-slate-800
        rounded-3xl
        p-5
      "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Productos</p>

            <h2 className="text-3xl font-bold mt-2">48</h2>
          </div>

          <div
            className="
            w-14 h-14
            rounded-2xl
            bg-blue-600/20
            flex items-center justify-center
            text-blue-400
          "
          >
            <UtensilsCrossed size={28} />
          </div>
        </div>
      </div>

      <div
        className="
        bg-slate-900
        border border-slate-800
        rounded-3xl
        p-5
      "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Ventas Menú</p>

            <h2 className="text-3xl font-bold mt-2">$8.2M</h2>
          </div>

          <div
            className="
            w-14 h-14
            rounded-2xl
            bg-green-500/20
            flex items-center justify-center
            text-green-400
          "
          >
            <CircleDollarSign size={28} />
          </div>
        </div>
      </div>

      <div
        className="
        bg-slate-900
        border border-slate-800
        rounded-3xl
        p-5
      "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Más Vendido</p>

            <h2 className="text-2xl font-bold mt-2">BBQ Burger</h2>
          </div>

          <div
            className="
            w-14 h-14
            rounded-2xl
            bg-orange-500/20
            flex items-center justify-center
            text-orange-400
          "
          >
            <Flame size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
