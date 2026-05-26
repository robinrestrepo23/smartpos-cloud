import CategoryFilter from "@/components/orders/CategoryFilter";
import ProductCard from "@/components/orders/ProductCard";
import Cart from "@/components/orders/Cart";

const products = [
  {
    name: "Hamburguesa BBQ",
    price: "$24.000",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200",
  },
  {
    name: "Pizza Pepperoni",
    price: "$38.000",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200",
  },
  {
    name: "Combo Familiar",
    price: "$52.000",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200",
  },
  {
    name: "Malteada Oreo",
    price: "$16.000",
    image:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200",
  },
];

export default function Orders() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Punto de Venta</h1>

        <p className="text-slate-400 mt-1">Gestiona pedidos en tiempo real.</p>
      </div>

      {/* CATEGORIES */}
      <CategoryFilter />

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
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>

        {/* CART */}
        <Cart />
      </div>
    </div>
  );
}
