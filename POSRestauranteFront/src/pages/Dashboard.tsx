import { DollarSign, ShoppingCart, AlertTriangle, Brain } from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import PredictionCard from "@/components/dashboard/PredictionCard";
import { getPerfil } from "@/services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerDashboard,
  obtenerRecomendacionIA,
} from "@/services/dashboardService";
import { getPedidos } from "@/services/orderService";

export default function Dashboard() {
  const [perfil, setPerfil] = useState<any>(null);
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [recomendacionIA, setRecomendacionIA] = useState<any>(null);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPerfil();
    cargarDashboard();
    cargarRecomendacionIA();
    cargarPedidos();
  }, []);

  const cargarDashboard = async () => {
    try {
      const data = await obtenerDashboard();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarPedidos = async () => {
    try {
      const data = await getPedidos();

      setPedidos(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const cargarRecomendacionIA = async () => {
    try {
      const data = await obtenerRecomendacionIA();
      setRecomendacionIA(data);
    } catch (error) {
      console.error(error);
    }
  };
  const cargarPerfil = async () => {
    try {
      const data = await getPerfil();
      setPerfil(data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }
  };
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard General</h1>
        <p className="text-slate-400 mt-1">Bienvenido, {perfil?.nombre}</p>
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
          title="Ventas del Mes"
          value={`$${Number(dashboard?.ventasDelMes || 0).toLocaleString(
            "es-CO",
          )}`}
          icon={<DollarSign size={28} />}
        />

        <StatsCard
          title="Pedidos"
          value={String(dashboard?.pedidosDelMes || 0)}
          icon={<ShoppingCart size={28} />}
        />

        <StatsCard
          title="Alertas Inventario"
          value={String(dashboard?.alertasInventario?.length || 0)}
          icon={<AlertTriangle size={28} />}
        />

        <StatsCard
          title="Ticket Promedio"
          value={`$${Number(dashboard?.ticketPromedio || 0).toLocaleString(
            "es-CO",
          )}`}
          icon={<Brain size={28} />}
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
          <SalesChart data={dashboard?.ventasUltimos7Dias || []} />
        </div>
        <PredictionCard recomendacionIA={recomendacionIA} />{" "}
      </div>

      {/* RECENT ORDERS */}
      <RecentOrders pedidos={pedidos} />
    </div>
  );
}
