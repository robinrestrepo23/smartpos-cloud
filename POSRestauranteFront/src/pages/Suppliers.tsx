import SupplierCard from "@/components/suppliers/SupplierCard";
import SupplierStats from "@/components/suppliers/SupplierStats";
import PurchaseSuggestion from "@/components/suppliers/PurchaseSuggestion";
import SupplierFormModal from "@/components/suppliers/SupplierFormModal";
import { useEffect, useState } from "react";
import { getSuppliers, Supplier } from "@/services/supplierService";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProveedores = async () => {
    try {
      const data = await getSuppliers();

      setSuppliers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  if (loading) {
    return <div>Cargando proveedores...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      {/* HEADER */}
      <div
        className="
  flex flex-col md:flex-row
  md:items-center
  md:justify-between
  gap-4
"
      >
        <div>
          <h1 className="text-3xl font-bold">Gestión de Proveedores</h1>

          <p className="text-slate-400 mt-1">
            Control de compras y abastecimiento.
          </p>
        </div>

        <SupplierFormModal onUpdated={cargarProveedores} />
      </div>
      {/* STATS */}
      <SupplierStats />

      {/* IA */}
      <PurchaseSuggestion />

      {/* SUPPLIERS */}
      <div
        className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
      >
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onUpdated={cargarProveedores}
          />
        ))}
      </div>
    </div>
  );
}
