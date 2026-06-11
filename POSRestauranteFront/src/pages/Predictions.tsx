import { useEffect, useState } from "react";

import {
  obtenerInsumosIA,
  obtenerProductosIA,
  predecirInventario,
  predecirVentas,
} from "@/services/predictionService";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { toast } from "sonner";

export default function Predictions() {
  const [productos, setProductos] = useState<any[]>([]);

  const [productoId, setProductoId] = useState("");

  const [prediccion, setPrediccion] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [insumos, setInsumos] = useState<any[]>([]);

  const [insumoId, setInsumoId] = useState("");

  const [prediccionInventario, setPrediccionInventario] = useState<any>(null);
  const [loadingInventario, setLoadingInventario] = useState(false);

  useEffect(() => {
    cargarProductos();
    cargarInsumos();
  }, []);

  const cargarProductos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const data = await obtenerProductosIA(user.restauranteId);

      setProductos(data.productos);
    } catch (error) {
      console.error(error);

      toast.error("No fue posible cargar productos");
    }
  };

  const cargarInsumos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const data = await obtenerInsumosIA(user.restauranteId);

      setInsumos(data.insumos);
    } catch (error) {
      console.error(error);
    }
  };

  const generarPrediccion = async () => {
    if (!productoId) {
      toast.error("Seleccione un producto");
      return;
    }

    try {
      setLoading(true);

      const data = await predecirVentas(productoId, 30);

      setPrediccion(data);

      toast.success("Predicción generada");
    } catch (error) {
      console.error(error);

      toast.error("No fue posible generar la predicción");
    } finally {
      setLoading(false);
    }
  };

  const generarPrediccionInventario = async () => {
    try {
      if (!insumoId) {
        toast.error("Seleccione un insumo");
        return;
      }

      const data = await predecirInventario(insumoId);

      setPrediccionInventario(data);

      toast.success("Predicción de inventario generada");
    } catch (error) {
      console.error(error);

      toast.error("No fue posible generar la predicción");
    }
  };

  const totalEstimado =
    prediccion?.predicciones?.reduce(
      (acc: number, item: any) => acc + item.yhat,
      0,
    ) || 0;

  const promedioDiario = prediccion?.predicciones?.length
    ? totalEstimado / prediccion.predicciones.length
    : 0;

  const recomendacion =
    promedioDiario >= 5
      ? {
          texto:
            "Alta demanda esperada. Considere aumentar inventario y personal.",
          color: "text-green-400",
        }
      : promedioDiario >= 2
        ? {
            texto: "Demanda estable. Mantenga inventario normal.",
            color: "text-yellow-400",
          }
        : {
            texto: "Demanda baja. Evite sobre abastecerse.",
            color: "text-red-400",
          };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Predicciones IA</h1>

        <p className="text-slate-400">
          Pronóstico de ventas futuras usando inteligencia artificial.
        </p>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-blue-400">
            Predicción de Productos
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select value={productoId} onValueChange={setProductoId}>
            <SelectTrigger className="w-mid">
              <SelectValue
                className="text-blue-400"
                placeholder="Seleccione un producto"
              />
            </SelectTrigger>

            <SelectContent>
              {productos.map((producto) => (
                <SelectItem key={producto.id} value={producto.id}>
                  {producto.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={generarPrediccion} disabled={loading}>
            {loading ? "Generando..." : "Generar predicción"}
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-orange-400">
            Predicción de Inventario
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select value={insumoId} onValueChange={setInsumoId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un insumo" />
            </SelectTrigger>

            <SelectContent>
              {insumos.map((insumo) => (
                <SelectItem key={insumo.id} value={insumo.id}>
                  {insumo.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="secondary"
            onClick={generarPrediccionInventario}
            disabled={loadingInventario}
          >
            {loadingInventario ? "Analizando..." : "Analizar Inventario"}
          </Button>
        </CardContent>
      </Card>

      {prediccionInventario && (
        <>
          <div
            className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
    "
          >
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-green-400">Stock actual</CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-green-400">
                  {prediccionInventario.stock_actual_formateado}
                </h2>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-blue-400">Consumo diario</CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-blue-400">
                  {prediccionInventario.consumo_formateado}
                </h2>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-orange-400">
                  Días restantes
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2
                  className={`
            text-4xl font-bold
            ${prediccionInventario.alerta ? "text-red-500" : "text-orange-400"}
          `}
                >
                  {prediccionInventario.dias_hasta_agotamiento} dias
                </h2>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Detalle de Consumo
              </CardTitle>
            </CardHeader>

            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-white">Producto</th>

                    <th className="text-left py-2 text-white">Ventas/día</th>

                    <th className="text-left py-2 text-white">Consumo</th>
                  </tr>
                </thead>

                <tbody>
                  {prediccionInventario.detalle_por_producto?.map(
                    (item: any, index: number) => (
                      <tr
                        key={index}
                        className="border-b border-slate-800 text-white"
                      >
                        <td className="py-2">{item.producto_nombre}</td>

                        <td className="py-2">
                          {item.ventas_diarias_estimadas}
                        </td>

                        <td className="py-2 text-orange-400">
                          {item.consumo_diario_estimado} {item.unidad}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}

      {prediccion && (
        <>
          <div
            className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
    "
          >
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Ventas estimadas
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-green-400">
                  {totalEstimado.toFixed(0)}
                </h2>

                <p className="text-slate-400">
                  unidades en los próximos 30 días
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-blue-400">Promedio diario</CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-blue-400">
                  {promedioDiario.toFixed(2)}
                </h2>

                <p className="text-slate-400">ventas por día</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  Días analizados
                </CardTitle>
              </CardHeader>

              <CardContent>
                <h2 className="text-4xl font-bold text-purple-400">
                  {prediccion.dias_predichos}
                </h2>

                <p className="text-slate-400">horizonte de predicción</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-purple-400">
                Recomendación IA
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className="
          bg-slate-800
          rounded-xl
          p-4
        "
              >
                <p
                  className={`
            text-lg
            font-semibold
            ${recomendacion.color}
          `}
                >
                  {recomendacion.texto}
                </p>

                <p className="text-slate-400 mt-2">
                  Basado en la demanda proyectada para los próximos 30 días.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Gráfico de predicción
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={prediccion.predicciones}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="ds" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="yhat"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={false}
                      name="Predicción"
                    />

                    <Line
                      type="monotone"
                      dataKey="yhat_upper"
                      stroke="#60a5fa"
                      strokeDasharray="5 5"
                      dot={false}
                      name="Límite superior"
                    />

                    <Line
                      type="monotone"
                      dataKey="yhat_lower"
                      stroke="#f87171"
                      strokeDasharray="5 5"
                      dot={false}
                      name="Límite inferior"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Detalle de Predicción
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="max-h-[400px] overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-white">
                      <th className="text-left py-2">Fecha</th>
                      <th className="text-left py-2">Predicción</th>
                      <th className="text-left py-2">Mínimo</th>
                      <th className="text-left py-2">Máximo</th>
                    </tr>
                  </thead>

                  <tbody>
                    {prediccion.predicciones.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="border-b border-slate-800 text-white"
                      >
                        <td className="py-2">{item.ds}</td>

                        <td className="py-2 text-green-400 font-semibold">
                          {item.yhat}
                        </td>

                        <td className="py-2 text-red-400">{item.yhat_lower}</td>

                        <td className="py-2 text-blue-400">
                          {item.yhat_upper}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
