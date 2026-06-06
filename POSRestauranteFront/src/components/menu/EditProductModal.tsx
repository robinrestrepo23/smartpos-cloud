import { useEffect, useState } from "react";

import {
  Producto,
  Categoria,
  IngredienteProducto,
  actualizarProducto,
  getRecetaProducto,
} from "@/services/menuService";

import { getInsumos, Insumo } from "@/services/inventoryService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  producto: Producto;

  categorias: Categoria[];

  onProductoActualizado: () => void;
}

export default function EditProductModal({
  open,
  onOpenChange,
  producto,
  categorias,
  onProductoActualizado,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [insumos, setInsumos] = useState<Insumo[]>([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [ingredientes, setIngredientes] = useState<IngredienteProducto[]>([]);

  useEffect(() => {
    if (!open) return;

    cargarDatos();
  }, [open]);

  const cargarDatos = async () => {
    try {
      const insumosData = await getInsumos();
      setInsumos(insumosData);

      setNombre(producto.nombre);
      setDescripcion(producto.descripcion || "");
      setPrecio(String(producto.precio));
      setCategoriaId(producto.categoriaId || "");
      setImagenUrl(producto.imagenUrl || "");

      const receta = await getRecetaProducto(producto.id);

      setIngredientes(
        receta.map((item: any) => ({
          insumoId: item.insumoId,
          cantidad: Number(item.cantidad),
          unidad: item.unidad,
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const agregarIngrediente = () => {
    setIngredientes([
      ...ingredientes,
      {
        insumoId: "",
        cantidad: 0,
        unidad: "",
      },
    ]);
  };

  const eliminarIngrediente = (index: number) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const actualizarIngrediente = (
    index: number,
    campo: keyof IngredienteProducto,
    valor: any,
  ) => {
    const copia = [...ingredientes];

    copia[index] = {
      ...copia[index],
      [campo]: valor,
    };

    setIngredientes(copia);
  };

  const guardarCambios = async () => {
    try {
      setLoading(true);

      await actualizarProducto(producto.id, {
        nombre,
        descripcion,
        precio: Number(precio),
        categoriaId,
        disponible: producto.disponible,
        imagenUrl,
        ingredientes,
      });

      onProductoActualizado();

      onOpenChange(false);
    } catch (error) {
      console.error(error);
      alert("Error actualizando producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <label className="text-sm text-slate-400">Nombre del producto</label>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <label className="text-sm text-slate-400">Precio</label>

          <Input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio"
          />
          <label className="text-sm text-slate-400">
            Categoria del producto
          </label>
          <Select value={categoriaId} onValueChange={setCategoriaId}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>

            <SelectContent>
              {categorias.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label className="text-sm text-slate-400">Descripción</label>
          <Textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
          />

          <label className="text-sm text-slate-400">URL Imagen</label>
          <Input
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="URL imagen"
          />

          <div className="space-y-3">
            <div className="flex justify-between">
              <h3 className="font-semibold">Ingredientes</h3>

              <Button type="button" onClick={agregarIngrediente}>
                Agregar
              </Button>
            </div>

            {ingredientes.map((ingrediente, index) => (
              <div key={index} className="grid grid-cols-12 gap-3">
                <div className="col-span-5">
                  <Select
                    value={ingrediente.insumoId}
                    onValueChange={(value) => {
                      const insumo = insumos.find((i) => i.id === value);

                      const copia = [...ingredientes];

                      copia[index] = {
                        ...copia[index],
                        insumoId: value,
                        unidad: insumo?.unidad || "",
                      };

                      setIngredientes(copia);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Insumo" />
                    </SelectTrigger>

                    <SelectContent>
                      {insumos.map((insumo) => (
                        <SelectItem key={insumo.id} value={insumo.id}>
                          {insumo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-3">
                  <Input
                    type="number"
                    value={ingrediente.cantidad}
                    onChange={(e) =>
                      actualizarIngrediente(
                        index,
                        "cantidad",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>

                <div className="col-span-2">
                  <Input value={ingrediente.unidad} disabled />
                </div>

                <div className="col-span-2">
                  <Button
                    variant="destructive"
                    onClick={() => eliminarIngrediente(index)}
                  >
                    X
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>

            <Button onClick={guardarCambios} disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
