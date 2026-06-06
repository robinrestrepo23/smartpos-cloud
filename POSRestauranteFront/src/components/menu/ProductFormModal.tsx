import { useState } from "react";
import { useEffect } from "react";

import { IngredienteProducto } from "@/services/menuService";

import { getInsumos, Insumo } from "@/services/inventoryService";

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

import { Categoria, crearProducto } from "@/services/menuService";

interface Props {
  categorias: Categoria[];
  onProductoCreado: () => void;
}

export default function ProductFormModal({
  categorias,
  onProductoCreado,
}: Props) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [available, setAvailable] = useState(true);
  const [imagenUrl, setImagenUrl] = useState("");

  const [insumos, setInsumos] = useState<Insumo[]>([]);

  const [ingredientes, setIngredientes] = useState<IngredienteProducto[]>([]);
  useEffect(() => {
    cargarInsumos();
  }, []);

  const cargarInsumos = async () => {
    try {
      const data = await getInsumos();
      console.log("INSUMOS:");
      console.table(data);
      setInsumos(data);
    } catch (error) {
      console.error(error);
    }
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

  const eliminarIngrediente = (index: number) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
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
  const guardarProducto = async () => {
    if (!nombre.trim()) {
      alert("Ingrese el nombre del producto");
      return;
    }

    if (!precio || Number(precio) <= 0) {
      alert("Ingrese un precio válido");
      return;
    }

    if (!categoriaId) {
      alert("Seleccione una categoría");
      return;
    }
    const ingredientesInvalidos = ingredientes.some(
      (i) => !i.insumoId || i.cantidad <= 0,
    );

    if (ingredientesInvalidos) {
      alert(
        "Todos los ingredientes deben tener un insumo seleccionado y una cantidad válida",
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        nombre,
        descripcion,
        precio: Number(precio),
        categoriaId,
        disponible: available,
        imagenUrl,
        ingredientes,
      };

      console.log("PAYLOAD ENVIADO:");
      console.log(payload);
      console.log("ESTADO ACTUAL DE INGREDIENTES:");
      console.table(ingredientes);

      await crearProducto(payload);

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoriaId("");
      setAvailable(true);
      setImagenUrl("");
      setIngredientes([]);

      setOpen(false);

      onProductoCreado();
    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-2xl" disabled={categorias.length === 0}>
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

        {categorias.length === 0 ? (
          <div
            className="
              mt-4
              bg-amber-500/10
              border border-amber-500/30
              rounded-2xl
              p-4
            "
          >
            <p className="text-amber-300">
              Debes crear al menos una categoría antes de registrar productos.
            </p>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {/* NOMBRE */}
            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Nombre del producto
              </label>

              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Hamburguesa BBQ"
                className="h-12 rounded-2xl"
              />
            </div>

            {/* PRECIO + CATEGORIA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Precio</label>

                <Input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="28000"
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400">Categoría</label>

                <Select value={categoriaId} onValueChange={setCategoriaId}>
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>

                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* INGREDIENTES */}
            <div
              className="
    bg-slate-900
    border border-slate-800
    rounded-2xl
    p-5
    space-y-4
  "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Ingredientes del Producto</h3>

                  <p className="text-sm text-slate-400">
                    Estos ingredientes serán descontados automáticamente del
                    inventario cuando se venda el producto.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={agregarIngrediente}
                  className="rounded-2xl"
                >
                  Agregar Ingrediente
                </Button>
              </div>

              {ingredientes.length === 0 ? (
                <div
                  className="
        text-sm
        text-slate-400
        border border-dashed border-slate-700
        rounded-2xl
        p-4
      "
                >
                  Este producto aún no tiene ingredientes.
                </div>
              ) : (
                <div className="space-y-3">
                  {ingredientes.map((ingrediente, index) => (
                    <div
                      key={index}
                      className="
            grid
            grid-cols-12
            gap-3
            items-end
          "
                    >
                      <div className="col-span-5">
                        <label className="text-xs text-slate-400">Insumo</label>

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
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Seleccionar" />
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
                        <label className="text-xs text-slate-400">
                          Cantidad
                        </label>

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
                          className="rounded-2xl"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-xs text-slate-400">Unidad</label>

                        <Input
                          value={ingrediente.unidad}
                          disabled
                          className="rounded-2xl"
                        />
                      </div>

                      <div className="col-span-2">
                        <Button
                          type="button"
                          variant="destructive"
                          className="w-full rounded-2xl"
                          onClick={() => eliminarIngrediente(index)}
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Descripción</label>

              <Textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe el producto..."
                className="rounded-2xl min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Imagen del producto
              </label>

              <Input
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                placeholder="https://..."
                className="h-12 rounded-2xl"
              />
            </div>

            {/* DISPONIBLE */}
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

            {/* BOTONES */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <Button
                className="rounded-2xl"
                onClick={guardarProducto}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar Producto"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
