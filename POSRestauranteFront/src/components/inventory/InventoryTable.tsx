import { Insumo } from "@/services/inventoryService";
import StockBadge from "./StockBadge";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import InventoryFormModal from "./InventoryFormModal";

interface Props {
  insumos: Insumo[];
  onUpdated: () => void;
}

export default function InventoryTable({ insumos }: Props) {
  function onUpdated(): void {
    throw new Error("Function not implemented.");
  }

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
              <th className="p-5 text-sm font-medium text-slate-400">Insumo</th>

              <th className="p-5 text-sm font-medium text-slate-400">
                Stock Actual
              </th>

              <th className="p-5 text-sm font-medium text-slate-400">
                Stock Mínimo
              </th>

              <th className="p-5 text-sm font-medium text-slate-400">
                Stock Crítico
              </th>

              <th className="p-5 text-sm font-medium text-slate-400">Unidad</th>

              <th className="p-5 text-sm font-medium text-slate-400">Estado</th>
              <th className="p-5 text-sm font-medium text-slate-400">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {insumos.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="
                    p-10
                    text-center
                    text-slate-400
                  "
                >
                  No hay insumos registrados.
                </td>
              </tr>
            ) : (
              insumos.map((insumo) => (
                <tr
                  key={insumo.id}
                  className="
                    border-t border-slate-800
                    hover:bg-slate-800/40
                    transition
                  "
                >
                  <td className="p-5 font-medium">{insumo.nombre}</td>

                  <td className="p-5 text-slate-300">
                    {insumo.stockActual} {insumo.unidad}
                  </td>

                  <td className="p-5 text-slate-300">
                    {insumo.stockMinimo} {insumo.unidad}
                  </td>

                  <td className="p-5 text-slate-300">
                    {insumo.stockCritico} {insumo.unidad}
                  </td>

                  <td className="p-5 text-slate-300">{insumo.unidad}</td>

                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <StockBadge
                        status={
                          insumo.estado === "CRITICO"
                            ? "low"
                            : insumo.estado === "BAJO"
                              ? "medium"
                              : "high"
                        }
                      />

                      <InventoryFormModal
                        insumo={insumo}
                        onInsumoCreado={onUpdated}
                        trigger={
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-xl"
                          >
                            <Pencil size={15} />
                          </Button>
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
