interface Props {
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({ name, price, image }: Props) {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      overflow-hidden
      hover:border-blue-500
      transition-all
      cursor-pointer
      group
    "
    >
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition duration-300
          "
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">{name}</h2>

            <p className="text-slate-400 text-sm mt-1">Producto del menú</p>
          </div>

          <div
            className="
            bg-blue-600/20
            text-blue-400
            px-3 py-1
            rounded-xl
            text-sm font-medium
          "
          >
            {price}
          </div>
        </div>

        <button
          className="
          mt-5 w-full h-11
          rounded-2xl
          bg-blue-600
          hover:bg-blue-500
          transition
          font-medium
        "
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
