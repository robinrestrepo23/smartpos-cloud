export default function PredictionCard() {
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
      <div className="space-y-4">
        <div>
          <p className="text-sm opacity-80">Predicción IA</p>

          <h2 className="text-2xl font-bold mt-2">Alta demanda esperada</h2>
        </div>

        <p className="text-sm opacity-90 leading-relaxed">
          Se espera un aumento del 35% en ventas este fin de semana debido a la
          quincena.
        </p>

        <div
          className="
          bg-white/20
          rounded-2xl
          p-4
          backdrop-blur-sm
        "
        >
          <p className="text-sm">Recomendación automática:</p>

          <h3 className="font-semibold mt-2">
            Comprar 25kg extra de carne y 15 paquetes de pan.
          </h3>
        </div>
      </div>
    </div>
  );
}
