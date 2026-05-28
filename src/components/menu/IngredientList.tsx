const ingredients = [
  {
    name: "Pan Brioche",
    quantity: "2 unidades",
  },
  {
    name: "Carne Angus",
    quantity: "250g",
  },
  {
    name: "Queso Cheddar",
    quantity: "80g",
  },
  {
    name: "Salsa BBQ",
    quantity: "30ml",
  },
];

export default function IngredientList() {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
    "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Ingredientes Asociados</h2>

        <p className="text-sm text-slate-400 mt-1">
          Consumo automático por venta.
        </p>
      </div>

      <div className="space-y-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="
              bg-slate-800
              rounded-2xl
              p-4
              flex items-center justify-between
            "
          >
            <div>
              <h3 className="font-medium">{ingredient.name}</h3>

              <p className="text-sm text-slate-400">Inventario sincronizado</p>
            </div>

            <div
              className="
              bg-blue-600/20
              text-blue-400
              px-3 py-1 rounded-xl
              text-sm font-medium
            "
            >
              {ingredient.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
