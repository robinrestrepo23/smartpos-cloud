import { useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { actualizarProducto, deleteProducto } from "@/services/menuService";
import { cambiarDisponibilidad, Categoria } from "@/services/menuService";
import EditProductModal from "@/components/menu/EditProductModal";

interface Props {
  producto: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
    categoriaId?: string;
    categoriaNombre?: string;
    imagenUrl?: string;
    ingredientes?: {
      insumoId: string;
      unidad: string;
      cantidad: number;
    }[];
  };

  categorias: Categoria[];
  onUpdated: () => void;
  onSelect: (producto: any) => void;
}

export default function MenuItemCard({
  producto,
  categorias,
  onUpdated,
  onSelect,
}: Props) {
  const [isAvailable, setIsAvailable] = useState(producto.disponible);
  const [openEdit, setOpenEdit] = useState(false);
  const image =
    producto.imagenUrl ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200";

  const cambiarEstado = async (estado: boolean) => {
    console.log("CAMBIANDO:", estado);

    try {
      await cambiarDisponibilidad(producto.id, estado);

      setIsAvailable(estado);

      onUpdated();
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarProducto = async () => {
    try {
      await deleteProducto(producto.id);

      onUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => onSelect(producto)}
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      overflow-hidden
      hover:border-blue-500
      transition-all
      group
    "
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={producto.nombre}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition duration-300
          "
        />

        {/* STATUS */}
        <div
          className={`
          absolute top-4 right-4
          px-3 py-1 rounded-xl
          text-xs font-semibold
          backdrop-blur-sm
          ${
            isAvailable
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }
        `}
        >
          {isAvailable ? "Disponible" : "Agotado"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TOP */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{producto.nombre}</h2>

            <p className="text-sm text-slate-400 mt-1">
              {producto.categoriaNombre || "Sin categoría"}
            </p>
          </div>

          <div
            className="
            bg-blue-600/20
            text-blue-400
            px-3 py-1 rounded-xl
            text-sm font-semibold
            whitespace-nowrap
          "
          >
            ${Number(producto.precio).toLocaleString("es-CO")}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-500 mt-4 line-clamp-3">
          {producto.descripcion || "Sin descripción disponible"}
        </p>

        {/* AVAILABILITY */}
        <div
          className="
          mt-5
          flex items-center justify-between
          bg-slate-800
          rounded-2xl
          p-4
        "
        >
          <div>
            <p className="font-medium text-sm">Disponible</p>

            <p className="text-xs text-slate-400">Visible en el POS</p>
          </div>

          <Switch checked={isAvailable} onCheckedChange={cambiarEstado} />
        </div>

        {/* ACTIONS */}
        <div
          className="
          mt-5
          flex items-center gap-3
        "
        >
          <Button
            className="
    flex-1
    rounded-2xl
  "
            onClick={() => setOpenEdit(true)}
          >
            <Pencil size={16} />
            Editar
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="rounded-2xl">
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent
              className="
              bg-slate-950
              border border-slate-800
              text-white
            "
            >
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
              </AlertDialogHeader>

              <p className="text-sm text-slate-400">
                Esta acción eliminará el producto del menú.
              </p>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>

                <AlertDialogAction onClick={eliminarProducto}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <EditProductModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            producto={producto}
            categorias={categorias}
            onProductoActualizado={onUpdated}
          />
        </div>
      </div>
    </div>
  );
}
