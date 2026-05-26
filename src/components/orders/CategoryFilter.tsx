const categories = ["Todos", "Hamburguesas", "Pizzas", "Bebidas", "Combos"];

export default function CategoryFilter() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category, index) => (
        <button
          key={category}
          className={`
            px-5 py-2 rounded-2xl text-sm font-medium
            whitespace-nowrap transition-all
            ${
              index === 0
                ? "bg-blue-600 text-white"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
