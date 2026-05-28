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

interface Props {
  name: string;
  price: string;
  image: string;
  available: boolean;
}

export default function MenuItemCard({ name, price, image, available }: Props) {
  const [isAvailable, setIsAvailable] = useState(available);

  return (
    <div
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
          alt={name}
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
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{name}</h2>

            <p className="text-sm text-slate-400 mt-1">
              Producto del menú principal
            </p>
          </div>

          <div
            className="
            bg-blue-600/20
            text-blue-400
            px-3 py-1 rounded-xl
            text-sm font-semibold
          "
          >
            {price}
          </div>
        </div>

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

          <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
        </div>

        {/* ACTIONS */}
        <div
          className="
          mt-5
          flex items-center gap-3
        "
        >
          {/* EDIT */}
          <Button
            className="
              flex-1
              rounded-2xl
            "
          >
            <Pencil size={16} />
            Editar
          </Button>

          {/* DELETE */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="
                  rounded-2xl
                "
              >
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

                <AlertDialogAction>Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
