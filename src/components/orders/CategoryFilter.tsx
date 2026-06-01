interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = ["Todos", "Hamburguesas", "Pizzas", "Bebidas", "Combos"];

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`
            px-5 py-2 rounded-2xl text-sm font-medium
            whitespace-nowrap transition-all

            ${
              selected === category
                ? "bg-blue-600 text-white"
                : "bg-slate-900 border border-slate-800 text-slate-300"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
