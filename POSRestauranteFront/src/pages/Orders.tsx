import CategoryFilter from "@/components/orders/CategoryFilter";
import ProductCard from "@/components/orders/ProductCard";
import Cart from "@/components/orders/Cart";
import { Button } from "@/components/ui/button";
import NewOrderModal from "@/components/orders/NewOrderModal";
import { useEffect, useState } from "react";
import { CartItem, getProducts, Producto } from "@/services/productService";
import {
  actualizarPedido,
  crearPedido,
  getPedidosActivos,
} from "@/services/orderService";
import { toast } from "sonner";
import { Mesa, getMesasDisponibles } from "@/services/mesaService";
import { Pedido } from "@/types/pedido";
import {
  connectPedidosSocket,
  disconnectPedidosSocket,
} from "@/services/websocket";

export default function Orders() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tipoPedido, setTipoPedido] = useState("MESA");
  const [mesaId, setMesaId] = useState("");
  const [mesasDisponibles, setMesasDisponibles] = useState<Mesa[]>([]);
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [clienteDireccion, setClienteDireccion] = useState("");
  const [pedidosActivos, setPedidosActivos] = useState<Pedido[]>([]);
  const [pedidoEditandoId, setPedidoEditandoId] = useState<string | null>(null);

  const productosDisponibles = products.filter((p) => p.disponible);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const [productosData, mesasData, pedidosData] = await Promise.all([
          getProducts(),
          getMesasDisponibles(),
          getPedidosActivos(),
          cargarPedidos(),
        ]);

        setProducts(productosData);

        setMesasDisponibles(mesasData);

        setPedidosActivos(pedidosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await getPedidosActivos();

      setPedidosActivos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarPedido = (pedido: Pedido) => {
    setPedidoEditandoId(pedido.id);

    setCart(
      pedido.items.map((item) => ({
        productoId: item.productoId,

        nombre: item.productoNombre,

        precio: item.precioUnitario,

        cantidad: item.cantidad,

        nota: item.notas,
      })),
    );
  };

  const agregarAlCarrito = (producto: Producto) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.productoId === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.productoId === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        },
      ];
    });
  };

  const eliminarDelCarrito = (productoId: string) => {
    setCart((prev) => prev.filter((item) => item.productoId !== productoId));
  };

  const aumentarCantidad = (productoId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productoId === productoId
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item,
      ),
    );
  };

  const disminuirCantidad = (productoId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productoId === productoId
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const actualizarNotas = (productoId: string, nota: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productoId === productoId
          ? {
              ...item,
              nota,
            }
          : item,
      ),
    );
  };

  const confirmarPedido = async () => {
    try {
      console.log("TIPO PEDIDO:", tipoPedido);
      console.log("MESA:", mesaId);
      const payload = {
        tipo: tipoPedido,
        mesaId: tipoPedido === "MESA" ? mesaId : null,

        clienteNombre: tipoPedido !== "MESA" ? clienteNombre : null,

        clienteTelefono: tipoPedido !== "MESA" ? clienteTelefono : null,

        clienteDireccion: tipoPedido === "DOMICILIO" ? clienteDireccion : null,

        items: cart.map((item) => ({
          productoId: item.productoId,
          cantidad: item.cantidad,
          notas: item.nota || "",
        })),
      };

      let pedido;

      if (pedidoEditandoId) {
        pedido = await actualizarPedido(pedidoEditandoId, payload);

        toast.success("Pedido actualizado");
      } else {
        pedido = await crearPedido(payload);

        toast.success("Pedido creado");
      }

      await cargarPedidos();

      console.log("PEDIDO CREADO", pedido);
      console.log("PAYLOAD ENVIADO", payload);

      toast.success("Pedido creado correctamente");

      setCart([]);
      setPedidoEditandoId(null);
    } catch (error) {
      console.error(error);

      toast.error("No fue posible crear el pedido");
    }
  };

  const filteredProducts =
    selectedCategory === "Todos"
      ? productosDisponibles
      : productosDisponibles.filter(
          (product) => product.categoriaNombre === selectedCategory,
        );
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div
        className="
  flex flex-col md:flex-row
  md:justify-between
  md:items-center
  gap-4
"
      ></div>
      <div>
        <h1 className="text-3xl font-bold">Punto de Venta</h1>

        <p className="text-slate-400 mt-1">Gestiona pedidos en tiempo real.</p>
      </div>
      <NewOrderModal />

      {/* CATEGORIES */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* CONTENT */}
      <div
        className="
        grid grid-cols-1
        xl:grid-cols-3
        gap-6
      "
      >
        {/* PRODUCTS */}
        <div
          className="
          xl:col-span-2
          grid grid-cols-1
          md:grid-cols-2
          gap-6
        "
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              producto={product}
              onAdd={agregarAlCarrito}
            />
          ))}
        </div>

        {/* CART */}
        <Cart
          items={cart}
          tipoPedido={tipoPedido}
          mesaId={mesaId}
          clienteNombre={clienteNombre}
          clienteTelefono={clienteTelefono}
          clienteDireccion={clienteDireccion}
          onClienteNombreChange={setClienteNombre}
          onClienteTelefonoChange={setClienteTelefono}
          onClienteDireccionChange={setClienteDireccion}
          onRemoveItem={eliminarDelCarrito}
          onIncreaseItem={aumentarCantidad}
          onDecreaseItem={disminuirCantidad}
          onUpdateNote={actualizarNotas}
          onConfirmOrder={confirmarPedido}
          onTipoPedidoChange={setTipoPedido}
          onMesaIdChange={setMesaId}
          mesasDisponibles={mesasDisponibles}
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Pedidos Activos</h2>

        {pedidosActivos.map((pedido) => (
          <div
            key={pedido.id}
            className="
        bg-slate-900
        border border-slate-800
        rounded-2xl
        p-4
      "
          >
            <div className="flex justify-between">
              <strong>{pedido.numero}</strong>

              <button
                onClick={() => cargarPedido(pedido)}
                className="
            text-blue-400
            hover:text-blue-300
          "
              >
                Editar
              </button>
            </div>

            <p>{pedido.estado}</p>

            <p>Total: ${pedido.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
