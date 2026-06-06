import { useEffect, useState } from "react";

import InventoryTable from "@/components/inventory/InventoryTable";
import LowStockAlert from "@/components/inventory/LowStockAlert";
import InventoryFormModal from "@/components/inventory/InventoryFormModal";

import { getInsumos, getAlertas, Insumo } from "@/services/inventoryService";

export default function Inventory() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [alertas, setAlertas] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const [insumosData, alertasData] = await Promise.all([
        getInsumos(),
        getAlertas(),
      ]);

      setInsumos(insumosData);
      setAlertas(alertasData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventario Inteligente</h1>

          <p className="text-slate-400 mt-1">
            Gestión automatizada de insumos y stock.
          </p>
        </div>

        <InventoryFormModal onInsumoCreado={cargarDatos} />
      </div>

      <LowStockAlert alertas={alertas} />

      {loading ? (
        <p>Cargando inventario...</p>
      ) : (
        <InventoryTable insumos={insumos} onUpdated={cargarDatos} />
      )}
    </div>
  );
}
