interface Props {
  recomendacionIA: any;
}

export default function PredictionCard({ recomendacionIA }: Props) {
  if (!recomendacionIA) return null;

  return (
    <div
      className="
      bg-gradient-to-br
      from-blue-600
      to-cyan-500
      rounded-3xl
      p-6
      text-white
      shadow-xl
    "
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm opacity-80">Inteligencia Artificial</p>

          <h2 className="text-2xl font-bold mt-2">Demanda proyectada</h2>
        </div>

        <div
          className="
          bg-white/15
          rounded-2xl
          p-4
          backdrop-blur-sm
        "
        >
          <p className="text-sm opacity-90">Producto con mayor demanda</p>

          <h3 className="text-xl font-bold mt-2">{recomendacionIA.producto}</h3>
        </div>

        <div
          className="
          bg-white/15
          rounded-2xl
          p-4
          backdrop-blur-sm
        "
        >
          <p className="text-sm opacity-90">Demanda estimada próximos 7 días</p>

          <h3 className="text-3xl font-bold mt-2">
            {recomendacionIA.demandaEstimada}
          </h3>

          <p className="text-sm opacity-80 mt-1">unidades proyectadas</p>
        </div>

        <div
          className="
          bg-white/20
          rounded-2xl
          p-4
          backdrop-blur-sm
        "
        >
          <p className="text-sm font-semibold mb-3">Insumos recomendados</p>

          <div className="space-y-2">
            {recomendacionIA.insumos?.map((insumo: any, index: number) => (
              <div
                key={index}
                className="
                  flex
                  justify-between
                  text-sm
                "
              >
                <span>{insumo.nombre}</span>

                <span className="font-semibold">
                  {insumo.cantidad.toFixed(0)} {insumo.unidad}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
