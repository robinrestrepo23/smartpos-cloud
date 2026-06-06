import { useState } from "react";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Menu,
  UtensilsCrossed,
  Truck,
  Brain,
  ChevronLeft,
  ArrowLeftCircle,
} from "lucide-react";

import { useNavigate, Link, Outlet } from "react-router-dom";
import { logout } from "@/services/authService";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Pedidos",
    icon: ShoppingCart,
    path: "/orders",
  },
  {
    name: "Inventario",
    icon: Package,
    path: "/inventory",
  },
  {
    name: "Menú",
    icon: UtensilsCrossed,
    path: "/menu",
  },
  {
    name: "Predicciones IA",
    icon: Brain,
    path: "/predictions",
  },
  {
    name: "Proveedores",
    icon: Truck,
    path: "/suppliers",
  },
  {
    name: "Salir",
    icon: ArrowLeftCircle,
    path: "/login",
  },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="
      min-h-screen
      bg-slate-950
      text-white
      flex
    "
    >
      {/* SIDEBAR */}
      <aside
        className={`
        bg-slate-900
        border-r border-slate-800
        transition-all duration-300
        flex flex-col
        ${collapsed ? "w-24" : "w-72"}
      `}
      >
        {/* TOP */}
        <div
          className="
          h-20
          border-b border-slate-800
          flex items-center justify-between
          px-5
        "
        >
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold">SmartPOS</h1>

              <p
                className="
                text-xs text-slate-400
              "
              >
                Cloud & AI
              </p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              w-10 h-10
              rounded-2xl
              bg-slate-800
              hover:bg-slate-700
              transition
              flex items-center justify-center
            "
          >
            <ChevronLeft
              size={20}
              className={`
                transition-transform
                ${collapsed ? "rotate-180" : ""}
              `}
            />
          </button>
        </div>

        {/* MENU */}
        <nav
          className="
  flex-1
  p-4
  space-y-2
"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.name === "Salir") {
              return (
                <button
                  key={item.name}
                  onClick={handleLogout}
                  className="
            w-full
            flex items-center gap-4
            px-4 py-3
            rounded-2xl
            hover:bg-red-500/20
            transition
            text-red-400
            hover:text-red-300
          "
                >
                  <Icon size={22} />

                  {!collapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.path}
                className="
          flex items-center gap-4
          px-4 py-3
          rounded-2xl
          hover:bg-slate-800
          transition
          text-slate-300
          hover:text-white
        "
              >
                <Icon size={22} />

                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* CONTENT */}
      <main
        className="
        flex-1
        p-6
        overflow-y-auto
      "
      >
        <Outlet />
      </main>
    </div>
  );
}
