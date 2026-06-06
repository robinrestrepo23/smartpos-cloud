import { useState } from "react";

import { Phone, Mail, Truck, Trash2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";

import SupplierFormModal from "./SupplierFormModal";

import { eliminarProveedor } from "@/services/supplierService";

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
import { Supplier } from "@/services/supplierService";

interface Props {
  supplier: Supplier;
  onUpdated: () => void;
}
export default function SupplierCard({ supplier, onUpdated }: Props) {
  const [isActive, setIsActive] = useState(supplier.activo);

  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
      hover:border-blue-500
      transition-all
    "
    >
      {/* HEADER */}
      <div
        className="
        flex items-start justify-between
      "
      >
        <div>
          <h2 className="text-2xl font-bold">{supplier.nombre}</h2>

          <p className="text-slate-400 mt-1">{supplier.contacto}</p>
        </div>

        <Switch checked={isActive} onCheckedChange={setIsActive} />
      </div>

      {/* INFO */}
      <div className="space-y-4 mt-6">
        <div
          className="
          flex items-center gap-3
        "
        >
          <Phone size={18} className="text-blue-400" />

          <span
            className="
            text-sm text-slate-300
          "
          >
            {supplier.telefono}
          </span>
        </div>

        <div
          className="
          flex items-center gap-3
        "
        >
          <Mail size={18} className="text-green-400" />

          <span
            className="
            text-sm text-slate-300
          "
          >
            {supplier.email}
          </span>
        </div>

        <div
          className="
          flex items-center gap-3
        "
        >
          <Truck size={18} className="text-orange-400" />

          <span
            className="
            text-sm text-slate-300
          "
          >
            Entregas rápidas en Valledupar
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
        mt-6
        flex items-center gap-3
      "
      >
        <button
          className="
          flex-1
          h-11
          rounded-2xl
          bg-blue-600
          hover:bg-blue-500
          transition
          font-medium
        "
        >
          Realizar Pedido
        </button>

        <SupplierFormModal editMode supplier={supplier} onUpdated={onUpdated} />

        {/* DELETE */}
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
              <AlertDialogTitle>¿Eliminar proveedor?</AlertDialogTitle>
            </AlertDialogHeader>

            <p
              className="
              text-sm text-slate-400
            "
            >
              Esta acción eliminará el proveedor permanentemente.
            </p>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>

              <Button
                onClick={async () => {
                  await eliminarProveedor(supplier.id);
                  onUpdated();
                }}
                variant="destructive"
                className="rounded-2xl"
              >
                <AlertDialogAction>Eliminar</AlertDialogAction>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
