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
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import { Plus } from "lucide-react";

export default function ProductFormModal() {
  const [available, setAvailable] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-2xl">
          <Plus size={18} />
          Nuevo Producto
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
        bg-slate-950
        border border-slate-800
        text-white
        max-w-2xl
        rounded-3xl
      "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear Producto</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* NAME */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">
              Nombre del producto
            </label>

            <Input
              placeholder="Ej: Hamburguesa BBQ"
              className="h-12 rounded-2xl"
            />
          </div>

          {/* PRICE + CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Precio</label>

              <Input placeholder="$28.000" className="h-12 rounded-2xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Categoría</label>

              <Select>
                <SelectTrigger className="h-12 rounded-2xl">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="hamburguesas">Hamburguesas</SelectItem>

                  <SelectItem value="pizzas">Pizzas</SelectItem>

                  <SelectItem value="bebidas">Bebidas</SelectItem>

                  <SelectItem value="combos">Combos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Descripción</label>

            <Textarea
              placeholder="Describe el producto..."
              className="rounded-2xl min-h-[120px]"
            />
          </div>

          {/* INGREDIENTS */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">
              Ingredientes asociados
            </label>

            <Textarea
              placeholder="
Pan Brioche - 2 unidades
Carne Angus - 250g
Queso Cheddar - 80g
              "
              className="rounded-2xl min-h-[140px]"
            />
          </div>

          {/* IMAGE */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">URL Imagen</label>

            <Input placeholder="https://..." className="h-12 rounded-2xl" />
          </div>

          {/* AVAILABLE */}
          <div
            className="
            flex items-center justify-between
            bg-slate-900
            rounded-2xl
            p-4
          "
          >
            <div>
              <h3 className="font-medium">Disponible</h3>

              <p className="text-sm text-slate-400">
                El producto aparecerá en el POS.
              </p>
            </div>

            <Switch checked={available} onCheckedChange={setAvailable} />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" className="rounded-2xl">
              Cancelar
            </Button>

            <Button className="rounded-2xl">Guardar Producto</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
