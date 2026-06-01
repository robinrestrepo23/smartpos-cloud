import CategoryFilter from "@/components/orders/CategoryFilter";
import ProductCard from "@/components/orders/ProductCard";
import Cart from "@/components/orders/Cart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewOrderModal from "@/components/orders/NewOrderModal";

const products = [
  {
    name: "Hamburguesa BBQ",
    price: "$24.000",
    category: "Hamburguesas",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200",
  },
  {
    name: "Pizza Pepperoni",
    price: "$38.000",
    category: "Pizzas",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200",
  },
  {
    name: "Combo Familiar",
    price: "$52.000",
    category: "Combos",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200",
  },
  {
    name: "Malteada Oreo",
    price: "$16.000",
    category: "Bebidas",
    image:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200",
  },
];

export default function Orders() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);
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
