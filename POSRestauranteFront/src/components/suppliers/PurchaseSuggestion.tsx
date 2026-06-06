import { Brain } from "lucide-react";

export default function PurchaseSuggestion() {
  return (
    <div
      className="
      bg-gradient-to-br
      from-blue-600
      to-cyan-500
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
          <Brain size={28} />
        </div>

        <div>
          <p className="text-sm opacity-80">IA Predictiva</p>

          <h2 className="text-2xl font-bold mt-2">Compra Recomendada</h2>

          <p className="text-sm opacity-90 mt-3 leading-relaxed">
            Se recomienda realizar pedido adicional de carne y pan para este fin
            de semana debido al aumento proyectado de ventas.
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
            Generar Orden
          </button>
        </div>
      </div>
    </div>
  );
}
