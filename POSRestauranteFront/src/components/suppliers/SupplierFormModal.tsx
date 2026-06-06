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

import {
  Supplier,
  crearProveedor,
  actualizarProveedor,
} from "@/services/supplierService";

interface Props {
  editMode?: boolean;
  supplier?: Supplier;
  onUpdated?: () => void;
}

export default function SupplierFormModal({
  editMode = false,
  supplier,
  onUpdated,
}: Props) {
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);

  const [nombre, setNombre] = useState(supplier?.nombre || "");

  const [contacto, setContacto] = useState(supplier?.contacto || "");

  const [telefono, setTelefono] = useState(supplier?.telefono || "");

  const [email, setEmail] = useState(supplier?.email || "");

  const guardarProveedor = async () => {
    try {
      const payload = {
        nombre,
        contacto,
        telefono,
        email,
      };

      if (editMode && supplier) {
        await actualizarProveedor(supplier.id, payload);
      } else {
        await crearProveedor(payload);
      }

      onUpdated?.();

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

            <Input
              placeholder="Ej: CarnesCOL"
              className="h-12 rounded-2xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          {/* CONTACT */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Contacto</label>

            <Input
              placeholder="Ej: Juan Pérez"
              className="h-12 rounded-2xl"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Teléfono</label>

            <Input
              placeholder="+57 300 000 0000"
              className="h-12 rounded-2xl"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Correo</label>

            <Input
              placeholder="ventas@proveedor.com"
              className="h-12 rounded-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button className="rounded-2xl" onClick={guardarProveedor}>
              {editMode ? "Guardar Cambios" : "Crear Proveedor"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
