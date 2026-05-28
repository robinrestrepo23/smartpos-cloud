import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";

import { Plus } from "lucide-react";

interface Props {
  editMode?: boolean;
}

export default function SupplierFormModal({ editMode = false }: Props) {
  const [active, setActive] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {editMode ? (
          <Button variant="outline" className="rounded-2xl">
            Editar
          </Button>
        ) : (
          <Button className="h-11 rounded-2xl">
            <Plus size={18} />
            Nuevo Proveedor
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="
        bg-slate-950
        border border-slate-800
        text-white
        rounded-3xl
        max-w-2xl
      "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editMode ? "Editar Proveedor" : "Nuevo Proveedor"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* NAME */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Nombre proveedor</label>

            <Input placeholder="Ej: CarnesCOL" className="h-12 rounded-2xl" />
          </div>

          {/* CATEGORY */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Categoría</label>

            <Input
              placeholder="Carnes y Embutidos"
              className="h-12 rounded-2xl"
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Teléfono</label>

            <Input
              placeholder="+57 300 000 0000"
              className="h-12 rounded-2xl"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Correo</label>

            <Input
              placeholder="ventas@proveedor.com"
              className="h-12 rounded-2xl"
            />
          </div>

          {/* ACTIVE */}
          <div
            className="
            bg-slate-900
            rounded-2xl
            p-4
            flex items-center justify-between
          "
          >
            <div>
              <h3 className="font-medium">Proveedor activo</h3>

              <p className="text-sm text-slate-400">Disponible para compras.</p>
            </div>

            <Switch checked={active} onCheckedChange={setActive} />
          </div>

          {/* ACTIONS */}
          <div
            className="
            flex justify-end gap-3 pt-4
          "
          >
            <Button variant="outline" className="rounded-2xl">
              Cancelar
            </Button>

            <Button className="rounded-2xl">
              {editMode ? "Guardar Cambios" : "Crear Proveedor"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
