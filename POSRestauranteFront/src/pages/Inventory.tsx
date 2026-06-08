import { useEffect, useState } from "react";

import InventoryTable from "@/components/inventory/InventoryTable";
import LowStockAlert from "@/components/inventory/LowStockAlert";
import InventoryFormModal from "@/components/inventory/InventoryFormModal";

import { getInsumos, getAlertas, Insumo } from "@/services/inventoryService";
import { Supplier, getSuppliers } from "@/services/supplierService";

export default function Inventory() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [alertas, setAlertas] = useState<Insumo[]>([]);
  const [proveedores, setProveedores] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const [insumosData, alertasData, proveedoresData] = await Promise.all([
        getInsumos(),
        getAlertas(),
        await getSuppliers(),
      ]);

      setInsumos(insumosData);
      setAlertas(alertasData);
      setProveedores(proveedoresData);
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

        <InventoryFormModal
          onInsumoCreado={cargarDatos}
          proveedores={proveedores}
        />
      </div>

      <LowStockAlert alertas={alertas} />

      {loading ? (
        <p>Cargando inventario...</p>
      ) : (
        <InventoryTable
          insumos={insumos}
          onUpdated={cargarDatos}
          proveedores={proveedores}
        />
      )}
    </div>
  );
}
