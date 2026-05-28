import SupplierCard from "@/components/suppliers/SupplierCard";
import SupplierStats from "@/components/suppliers/SupplierStats";
import PurchaseSuggestion from "@/components/suppliers/PurchaseSuggestion";
import SupplierFormModal from "@/components/suppliers/SupplierFormModal";

const suppliers = [
  {
    name: "CJ Distribuciones",
    category: "Carnes y Embutidos",
    phone: "+57 300 123 4567",
    email: "ventas@cjdistribuciones.com",
    active: true,
  },
  {
    name: "CarnesCOL",
    category: "Proveedor de Carne",
    phone: "+57 301 987 6543",
    email: "pedidos@carnescol.com",
    active: true,
  },
  {
    name: "Panadería Central",
    category: "Panes y Harinas",
    phone: "+57 305 444 2233",
    email: "compras@panaderiacentral.com",
    active: false,
  },
];

export default function Suppliers() {
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

        <SupplierFormModal />
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
            key={supplier.name}
            name={supplier.name}
            category={supplier.category}
            phone={supplier.phone}
            email={supplier.email}
            active={supplier.active}
          />
        ))}
      </div>
    </div>
  );
}
