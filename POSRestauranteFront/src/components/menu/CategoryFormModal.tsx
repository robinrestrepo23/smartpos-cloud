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

import { FolderPlus } from "lucide-react";

import { crearCategoria } from "@/services/menuService";

interface Props {
  onCategoriaCreada: () => void;
}

export default function CategoryFormModal({ onCategoriaCreada }: Props) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const guardarCategoria = async () => {
    if (!nombre.trim()) return;

    try {
      setLoading(true);

      await crearCategoria(nombre);

      setNombre("");

      setOpen(false);

      onCategoriaCreada();
    } catch (error) {
      console.error(error);
      alert("Error al crear categoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-11 rounded-2xl">
          <FolderPlus size={18} />
          Nueva Categoría
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          bg-slate-950
          border border-slate-800
          text-white
          rounded-3xl
        "
      >
        <DialogHeader>
          <DialogTitle>Crear Categoría</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Hamburguesas"
            className="h-12 rounded-2xl"
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>

            <Button onClick={guardarCategoria} disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
