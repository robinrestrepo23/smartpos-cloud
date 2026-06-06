import { useEffect, useState } from "react";

import MenuStats from "@/components/menu/MenuStats";
import MenuItemCard from "@/components/menu/MenuItemCard";
import IngredientList from "@/components/menu/IngredientList";
import ProductFormModal from "@/components/menu/ProductFormModal";
import CategoryFormModal from "@/components/menu/CategoryFormModal";

import {
  getProductos,
  getCategorias,
  Categoria,
  Producto,
} from "@/services/menuService";

export default function Menu() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [loadingProductos, setLoadingProductos] = useState(true);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProductos(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCategorias(false);
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
    setProductoSeleccionado(null);
  }, []);

  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold">Gestión de Menú</h1>

          <p className="text-slate-400 mt-1">
            Administración inteligente de productos y recetas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <CategoryFormModal onCategoriaCreada={cargarCategorias} />

          {!loadingCategorias && (
            <ProductFormModal
              categorias={categorias}
              onProductoCreado={cargarProductos}
            />
          )}
        </div>
      </div>

      {/* STATS */}
      <MenuStats />

      {/* CONTENT */}
      <div
        className="
        grid grid-cols-1
        xl:grid-cols-3
        gap-6
      "
      >
        {/* PRODUCTOS */}
        <div
          className="
          xl:col-span-2
          grid grid-cols-1
          md:grid-cols-2
          gap-6
        "
        >
          {loadingProductos ? (
            <p className="text-slate-400">Cargando productos...</p>
          ) : productos.length === 0 ? (
            <div
              className="
              col-span-full
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-10
              text-center
            "
            >
              <h3 className="text-xl font-semibold">
                No hay productos registrados
              </h3>

              <p className="text-slate-400 mt-2">
                Crea tu primera categoría y agrega productos al menú.
              </p>
            </div>
          ) : (
            productos.map((producto) => (
              <MenuItemCard
                key={producto.id}
                producto={producto}
                categorias={categorias}
                onUpdated={cargarProductos}
                onSelect={setProductoSeleccionado}
              />
            ))
          )}
        </div>

        {/* INGREDIENTES */}
        {productoSeleccionado && (
          <IngredientList
            producto={productoSeleccionado}
            onClose={() => setProductoSeleccionado(null)}
          />
        )}
      </div>
    </div>
  );
}
