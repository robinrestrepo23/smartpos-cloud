import InventoryTable from "@/components/inventory/InventoryTable";
import LowStockAlert from "@/components/inventory/LowStockAlert";

export default function Inventory() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Inventario Inteligente</h1>

        <p className="text-slate-400 mt-1">
          Gestión automatizada de insumos y stock.
        </p>
      </div>

      {/* ALERT */}
      <LowStockAlert />

      {/* TABLE */}
      <InventoryTable />
    </div>
  );
}
