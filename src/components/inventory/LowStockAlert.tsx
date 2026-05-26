import { AlertTriangle } from "lucide-react";

export default function LowStockAlert() {
  return (
    <div
      className="
      bg-gradient-to-br
      from-red-500
      to-orange-500
      rounded-3xl
      p-6
      shadow-xl
    "
    >
      <div className="flex items-start gap-4">
        <div
          className="
          w-14 h-14
          rounded-2xl
          bg-white/20
          flex items-center justify-center
          backdrop-blur-sm
        "
        >
          <AlertTriangle size={28} />
        </div>

        <div>
          <p className="text-sm opacity-80">Alerta de Inventario</p>

          <h2 className="text-2xl font-bold mt-2">Stock Crítico Detectado</h2>

          <p className="text-sm opacity-90 mt-3 leading-relaxed">
            El queso cheddar se encuentra por debajo del stock mínimo
            recomendado.
          </p>

          <button
            className="
            mt-5
            bg-white text-slate-900
            px-5 py-2 rounded-2xl
            font-semibold
            hover:bg-slate-100
            transition
          "
          >
            Generar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
