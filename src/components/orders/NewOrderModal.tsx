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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

export default function NewOrderModal() {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-2xl">
          <Plus size={18} />
          Nueva Orden
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear Nueva Orden</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div>
            <label className="text-sm text-slate-500">Cliente</label>

            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nombre del cliente"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Mesa</label>

            <Input
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Ej: Mesa 5"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Tipo de pedido</label>

            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="local">Consumo en local</SelectItem>

                <SelectItem value="pickup">Para recoger</SelectItem>

                <SelectItem value="delivery">Domicilio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-slate-500">Observaciones</label>

            <textarea
              className="
                mt-2
                w-full
                min-h-[100px]
                rounded-xl
                border
                bg-background
                p-3
              "
              placeholder="Sin cebolla, extra queso..."
            />
          </div>

          <Button
            className="
              w-full
              rounded-2xl
              h-11
            "
          >
            Crear Orden
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
