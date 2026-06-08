import CategoryFilter from "@/components/orders/CategoryFilter";
import ProductCard from "@/components/orders/ProductCard";
import Cart from "@/components/orders/Cart";
import { Button } from "@/components/ui/button";
import NewOrderModal from "@/components/orders/NewOrderModal";
import { useEffect, useState } from "react";
import { CartItem, getProducts, Producto } from "@/services/productService";
import { crearPedido } from "@/services/orderService";
import { toast } from "sonner";
import { Mesa, getMesasDisponibles } from "@/services/mesaService";

export default function Orders() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tipoPedido, setTipoPedido] = useState("MESA");
  const [mesaId, setMesaId] = useState("");
  const [mesasDisponibles, setMesasDisponibles] = useState<Mesa[]>([]);

  const productosDisponibles = products.filter((p) => p.disponible);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const [productosData, mesasData] = await Promise.all([
          getProducts(),
          getMesasDisponibles(),
        ]);

        setProducts(productosData);
        setMesasDisponibles(mesasData);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        items: cart.map((item) => ({
          productoId: item.productoId,
          cantidad: item.cantidad,
          notas: item.nota || "",
        })),
      };

      const pedido = await crearPedido(payload);

      console.log("PEDIDO CREADO", pedido);

      toast.success("Pedido creado correctamente");

      setCart([]);
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
    </div>
  );
}
