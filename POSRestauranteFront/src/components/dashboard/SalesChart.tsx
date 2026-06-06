import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const data = [
  { day: "Lun", sales: 1200 },
  { day: "Mar", sales: 2100 },
  { day: "Mié", sales: 1800 },
  { day: "Jue", sales: 2500 },
  { day: "Vie", sales: 4000 },
  { day: "Sáb", sales: 5200 },
  { day: "Dom", sales: 4700 },
];

export default function SalesChart() {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
      h-[400px]
    "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold">Ventas Semanales</h2>

        <p className="text-sm text-slate-400 mt-1">
          Comportamiento de ventas durante la semana.
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <XAxis dataKey="day" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
