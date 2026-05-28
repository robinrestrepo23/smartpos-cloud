import MenuStats from "@/components/menu/MenuStats";
import MenuItemCard from "@/components/menu/MenuItemCard";
import IngredientList from "@/components/menu/IngredientList";
import ProductFormModal from "@/components/menu/ProductFormModal";

const menuItems = [
  {
    name: "BBQ Burger",
    price: "$28.000",
    available: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200",
  },
  {
    name: "Pepperoni Pizza",
    price: "$42.000",
    available: true,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200",
  },
  {
    name: "Chicken Combo",
    price: "$36.000",
    available: false,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200",
  },
];

export default function Menu() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div
        className="
  flex flex-col md:flex-row
  md:items-center
  md:justify-between
  gap-4
"
      >
        <div>
          <h1 className="text-3xl font-bold">Gestión de Menú</h1>

          <p className="text-slate-400 mt-1">
            Administración inteligente de productos y recetas.
          </p>
        </div>

        <ProductFormModal />
      </div>

      {/* STATS */}
      <MenuStats />

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
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.name}
              name={item.name}
              price={item.price}
              image={item.image}
              available={item.available}
            />
          ))}
        </div>

        {/* INGREDIENTS */}
        <IngredientList />
      </div>
    </div>
  );
}
