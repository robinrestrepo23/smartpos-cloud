import { AlertTriangle } from "lucide-react";

import { Insumo } from "@/services/inventoryService";

interface Props {
  alertas: Insumo[];
}

export default function LowStockAlert({ alertas }: Props) {
  if (!alertas.length) return null;

  const criticos = alertas.filter((i) => i.estado === "CRITICO");

  const bajos = alertas.filter((i) => i.estado === "BAJO");

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

        <div className="flex-1">
          <p className="text-sm opacity-80">Alerta de Inventario</p>

          <h2 className="text-2xl font-bold mt-2">Stock Bajo Detectado</h2>

          <p className="text-sm opacity-90 mt-3">
            Hay <strong>{alertas.length}</strong> insumos que requieren
            atención.
          </p>

          {criticos.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Críticos:</p>

              <ul className="text-sm opacity-90 mt-1">
                {criticos.map((item) => (
                  <li key={item.id}>
                    • {item.nombre} ({item.stockActual}
                    {item.unidad})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bajos.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Bajos:</p>

              <ul className="text-sm opacity-90 mt-1">
                {bajos.map((item) => (
                  <li key={item.id}>
                    • {item.nombre} ({item.stockActual}
                    {item.unidad})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="
            mt-5
            bg-white
            text-slate-900
            px-5
            py-2
            rounded-2xl
            font-semibold
            hover:bg-slate-100
            transition
          "
          >
            Revisar Inventario
          </button>
        </div>
      </div>
    </div>
  );
}
