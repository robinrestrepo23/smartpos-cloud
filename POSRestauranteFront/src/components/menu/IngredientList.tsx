import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { getRecetaProducto } from "@/services/menuService";
import { Button } from "../ui/button";

interface Props {
  producto: {
    id: string;
    nombre: string;
  } | null;
  onClose?: () => void;
}

export default function IngredientList({ producto, onClose }: Props) {
  const [ingredientes, setIngredientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!producto) {
      setIngredientes([]);
      return;
    }

    cargarReceta();
  }, [producto]);

  const cargarReceta = async () => {
    try {
      setLoading(true);

      const data = await getRecetaProducto(producto!.id);

      setIngredientes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-slate-900
        border border-slate-800
        rounded-3xl
        p-6
      "
    >
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-2xl font-bold">Ingredientes Asociados</h2>

        <p className="text-sm text-slate-400 mt-1">
          {producto ? producto.nombre : "Selecciona un producto"}
        </p>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      {!producto ? (
        <div
          className="
            text-slate-400
            text-center
            py-10
          "
        >
          Selecciona un producto para ver su receta.
        </div>
      ) : loading ? (
        <div className="text-slate-400">Cargando ingredientes...</div>
      ) : ingredientes.length === 0 ? (
        <div className="text-slate-400">
          Este producto no tiene ingredientes.
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {ingredientes.map((ingredient) => (
            <div
              key={ingredient.id}
              className="
                bg-slate-800
                rounded-2xl
                p-4
                flex items-center justify-between
              "
            >
              <div>
                <h3 className="font-medium">{ingredient.insumoNombre}</h3>

                <p className="text-sm text-slate-400">
                  Inventario sincronizado
                </p>
              </div>

              <div
                className="
                  bg-blue-600/20
                  text-blue-400
                  px-3 py-1
                  rounded-xl
                  text-sm font-medium
                "
              >
                {ingredient.cantidad} {ingredient.unidad}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
