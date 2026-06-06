import { useEffect, useState, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

import {
  crearInsumo,
  actualizarInsumo,
  Insumo,
} from "@/services/inventoryService";

interface Props {
  onInsumoCreado: () => void;
  insumo?: Insumo;
  trigger?: ReactNode;
}

export default function InventoryFormModal({
  onInsumoCreado,
  insumo,
  trigger,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState("");
  const [stockActual, setStockActual] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [stockCritico, setStockCritico] = useState("");
  const [unidad, setUnidad] = useState("");

  useEffect(() => {
    if (insumo) {
      setNombre(insumo.nombre);
      setStockActual(insumo.stockActual.toString());
      setStockMinimo(insumo.stockMinimo.toString());
      setStockCritico(insumo.stockCritico.toString());
      setUnidad(insumo.unidad);
    }
  }, [insumo]);

  const guardarInsumo = async () => {
    if (!nombre || !stockActual || !stockMinimo || !stockCritico || !unidad) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        nombre,
        stockActual: Number(stockActual),
        stockMinimo: Number(stockMinimo),
        stockCritico: Number(stockCritico),
        unidad,
      };

      if (insumo) {
        const response = await actualizarInsumo(insumo.id, payload);
        console.log("ACTUALIZADO:", response);
      } else {
        const response = await crearInsumo(payload);
        console.log("CREADO:", response);
      }

      setOpen(false);

      try {
        await onInsumoCreado();
      } catch (e) {
        console.error("ERROR EN cargarDatos:", e);
      }
    } catch (error) {
      console.error("ERROR PRINCIPAL:", error);
      alert("Error al guardar el insumo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="rounded-2xl h-11">
            <Plus size={18} />
            Nuevo Insumo
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="
        bg-slate-950
        border border-slate-800
        text-white
        rounded-3xl
        max-w-xl
      "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {insumo ? "Editar Insumo" : "Crear Insumo"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Nombre</label>

            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Stock Actual</label>

              <Input
                type="number"
                value={stockActual}
                onChange={(e) => setStockActual(e.target.value)}
                className="h-12 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Unidad</label>

              <Select value={unidad} onValueChange={setUnidad}>
                <SelectTrigger className="h-12 rounded-2xl">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="kg">Kilogramos</SelectItem>

                  <SelectItem value="gr">Gramos</SelectItem>

                  <SelectItem value="und">Unidades</SelectItem>

                  <SelectItem value="ml">Mililitros</SelectItem>

                  <SelectItem value="lt">Litros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Stock Mínimo</label>

              <Input
                type="number"
                value={stockMinimo}
                onChange={(e) => setStockMinimo(e.target.value)}
                className="h-12 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Stock Crítico</label>

              <Input
                type="number"
                value={stockCritico}
                onChange={(e) => setStockCritico(e.target.value)}
                className="h-12 rounded-2xl"
              />
            </div>
          </div>
          <div
            className="
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-4
          "
          >
            <p className="font-medium">Configuración de Alertas</p>

            <p className="text-sm text-slate-400 mt-2">
              Cuando el stock llegue al mínimo se mostrará una advertencia.
              Cuando llegue al crítico aparecerá una alerta urgente para
              reposición.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>

            <Button onClick={guardarInsumo} disabled={loading}>
              {loading ? "Guardando..." : insumo ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
