import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

interface Props {
  data: {
    dia: string;
    total: number;
  }[];
}

export default function SalesChart({ data }: Props) {
  const dias: Record<string, string> = {
    MON: "Lun",
    TUE: "Mar",
    WED: "Mié",
    THU: "Jue",
    FRI: "Vie",
    SAT: "Sáb",
    SUN: "Dom",
  };

  const chartData = data.map((item) => ({
    day: dias[item.dia] || item.dia,
    sales: Number(item.total),
  }));
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
        <h2 className="text-xl font-bold">Ventas en los ultimos 7 dias</h2>

        <p className="text-sm text-slate-400 mt-1">
          Comportamiento reciente de ventas.
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={chartData}>
          <XAxis dataKey="day" />

          <Tooltip
            formatter={(value: any) =>
              `$${Number(value).toLocaleString("es-CO")}`
            }
          />

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
