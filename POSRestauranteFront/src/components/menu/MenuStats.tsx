import { UtensilsCrossed, CircleDollarSign, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getProductos, getCategorias } from "@/services/menuService";

export default function MenuStats() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [ventasTotales, setVentasTotales] = useState(0);
  const [productoMasVendido, setProductoMasVendido] = useState("");
  3;

  useEffect(() => {
    // Simulación de carga de datos
    const cargarDatos = async () => {
      try {
        const productos = await getProductos();
        const categorias = await getCategorias();
        setTotalProductos(productos.length);
        // Aquí podrías calcular ventasTotales y productoMasVendido
      } catch (error) {
        console.error("Error al cargar estadísticas del menú:", error);
      }
    };

    cargarDatos();
  }, []);

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

            <h2 className="text-3xl font-bold mt-2">{totalProductos}</h2>
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

            <h2 className="text-3xl font-bold mt-2">$8.2m</h2>
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
