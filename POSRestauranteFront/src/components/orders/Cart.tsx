import { CartItem } from "@/services/productService";
import { Trash2, Plus, Minus } from "lucide-react";
//HOLA
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Mesa } from "@/services/mesaService";

interface Props {
  items: CartItem[];
  tipoPedido: string;
  mesaId: string;

  clienteNombre: string;
  clienteTelefono: string;
  clienteDireccion: string;

  onClienteNombreChange?: (value: string) => void;
  onClienteTelefonoChange?: (value: string) => void;
  onClienteDireccionChange?: (value: string) => void;

  onRemoveItem?: (productoId: string) => void;
  onIncreaseItem?: (productoId: string) => void;
  onDecreaseItem?: (productoId: string) => void;
  onUpdateNote?: (productoId: string, nota: string) => void;
  onConfirmOrder?: () => void;
  onTipoPedidoChange?: (tipo: string) => void;
  onMesaIdChange?: (mesaId: string) => void;
  mesasDisponibles?: Mesa[];
}

export default function Cart({
  items,
  tipoPedido,
  mesaId,
  clienteNombre,
  clienteTelefono,
  clienteDireccion,
  onClienteNombreChange,
  onClienteTelefonoChange,
  onClienteDireccionChange,
  onRemoveItem,
  onIncreaseItem,
  onDecreaseItem,
  onUpdateNote,
  onConfirmOrder,
  onTipoPedidoChange,
  onMesaIdChange,
  mesasDisponibles,
}: Props) {
  const [tipoPedidoLocal, setTipoPedidoLocal] = useState(tipoPedido);
  const [mesaIdLocal, setMesaIdLocal] = useState(mesaId);
  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
      h-fit
      sticky top-6
    "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Pedido Actual</h2>

        <p className="text-sm text-slate-400 mt-1">Resumen del pedido.</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productoId}
            className="
              bg-slate-800
              rounded-2xl
              p-4
              flex items-center justify-between
            "
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="font-medium">{item.nombre}</h3>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => onDecreaseItem?.(item.productoId)}
                    className="
                    w-7 h-7
                    rounded-lg
                    bg-slate-700
                    hover:bg-slate-600
                    flex items-center justify-center
                  "
                  >
                    <Minus size={14} />
                  </button>

                  <span className="font-medium">{item.cantidad}</span>

                  <button
                    onClick={() => onIncreaseItem?.(item.productoId)}
                    className="
                    w-7 h-7
                    rounded-lg
                    bg-slate-700
                    hover:bg-slate-600
                    flex items-center justify-center
                  "
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <h3 className="font-semibold">
                  ${(item.precio * item.cantidad).toFixed(0)}
                </h3>

                <button
                  onClick={() => onRemoveItem?.(item.productoId)}
                  className="
      text-red-400
      hover:text-red-300
      transition
    "
                >
                  <Trash2 size={18} />
                </button>
                <textarea
                  value={item.nota || ""}
                  onChange={(e) =>
                    onUpdateNote?.(item.productoId, e.target.value)
                  }
                  placeholder="Ej: sin cebolla, extra queso..."
                  className="
    mt-2
    w-full
    rounded-xl
    bg-slate-700
    border border-slate-600
    p-2
    text-sm
    resize-none
  "
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-slate-400">Tipo de pedido</label>

          <Select
            value={tipoPedidoLocal}
            onValueChange={(value) => {
              setTipoPedidoLocal(value);
              onTipoPedidoChange?.(value);
            }}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="MESA">Mesa</SelectItem>

              <SelectItem value="DOMICILIO">Domicilio</SelectItem>

              <SelectItem value="RECOGER">Recoger</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {tipoPedidoLocal === "MESA" && (
          <div>
            <label className="text-sm text-slate-400">Mesa</label>

            <Select
              value={mesaIdLocal}
              onValueChange={(value) => {
                setMesaIdLocal(value);
                onMesaIdChange?.(value);
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Seleccionar mesa" />
              </SelectTrigger>

              <SelectContent>
                {mesasDisponibles?.map((mesa) => (
                  <SelectItem key={mesa.id} value={mesa.id}>
                    {mesa.numero}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {tipoPedidoLocal === "DOMICILIO" && (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400">
                Nombre del cliente
              </label>

              <input
                value={clienteNombre}
                onChange={(e) => onClienteNombreChange?.(e.target.value)}
                className="
          w-full mt-2
          rounded-xl
          bg-slate-800
          border border-slate-700
          p-3
        "
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Teléfono</label>

              <input
                value={clienteTelefono}
                onChange={(e) => onClienteTelefonoChange?.(e.target.value)}
                className="
          w-full mt-2
          rounded-xl
          bg-slate-800
          border border-slate-700
          p-3
        "
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Dirección</label>

              <textarea
                value={clienteDireccion}
                onChange={(e) => onClienteDireccionChange?.(e.target.value)}
                className="
          w-full mt-2
          rounded-xl
          bg-slate-800
          border border-slate-700
          p-3
        "
              />
            </div>
          </div>
        )}

        {tipoPedidoLocal === "RECOGER" && (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400">
                Nombre del cliente
              </label>

              <input
                value={clienteNombre}
                onChange={(e) => onClienteNombreChange?.(e.target.value)}
                className="
          w-full mt-2
          rounded-xl
          bg-slate-800
          border border-slate-700
          p-3
        "
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Teléfono</label>

              <input
                value={clienteTelefono}
                onChange={(e) => onClienteTelefonoChange?.(e.target.value)}
                className="
          w-full mt-2
          rounded-xl
          bg-slate-800
          border border-slate-700
          p-3
        "
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <p className="text-slate-400">Total</p>

          <h2 className="text-2xl font-bold">${total.toFixed(0)}</h2>
        </div>

        <button
          onClick={onConfirmOrder}
          disabled={items.length === 0}
          className="
  mt-6 w-full h-12
  rounded-2xl
  bg-green-500
  hover:bg-green-400
  disabled:opacity-50
  transition
  font-semibold
  text-slate-900
"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
