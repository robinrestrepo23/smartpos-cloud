import { DollarSign, ShoppingCart, AlertTriangle, Brain } from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import PredictionCard from "@/components/dashboard/PredictionCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard General</h1>

        <p className="text-slate-400 mt-1">Resumen general del restaurante.</p>
      </div>

      {/* STATS */}
      <div
        className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >
        <StatsCard
          title="Ventas Hoy"
          value="$2.5M"
          icon={<DollarSign size={28} />}
          trend="+12% esta semana"
        />

        <StatsCard
          title="Pedidos"
          value="145"
          icon={<ShoppingCart size={28} />}
          trend="+18 pedidos hoy"
        />

        <StatsCard
          title="Stock Bajo"
          value="7"
          icon={<AlertTriangle size={28} />}
          trend="3 productos críticos"
        />

        <StatsCard
          title="IA Predictiva"
          value="35%"
          icon={<Brain size={28} />}
          trend="Demanda proyectada"
        />
      </div>

      {/* CHART + IA */}
      <div
        className="
        grid grid-cols-1
        xl:grid-cols-3
        gap-6
      "
      >
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <PredictionCard />
      </div>

      {/* RECENT ORDERS */}
      <RecentOrders />
    </div>
  );
}
