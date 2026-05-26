import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Brain,
  UtensilsCrossed,
  Truck,
  ChevronLeft,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Pedidos",
    icon: ShoppingCart,
    path: "/orders",
  },
  {
    label: "Inventario",
    icon: Boxes,
    path: "/inventory",
  },
  {
    label: "Menú",
    icon: UtensilsCrossed,
    path: "/menu",
  },
  {
    label: "Predicciones IA",
    icon: Brain,
    path: "/predictions",
  },
  {
    label: "Proveedores",
    icon: Truck,
    path: "/providers",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* HEADER */}
      <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SmartPOS</h1>

          <p className="text-xs text-slate-400">Cloud Intelligence</p>
        </div>

        <button className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-2xl
                    transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <Icon size={20} />

                  <span className="font-medium text-sm">{link.label}</span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="text-sm font-semibold">IA Predictiva</p>

          <p className="text-xs text-slate-400 mt-1">
            Alta demanda esperada este fin de semana.
          </p>

          <div className="mt-4 w-full h-2 rounded-full bg-slate-700 overflow-hidden">
            <div className="w-4/5 h-full bg-green-400 rounded-full" />
          </div>
        </div>
      </div>
    </aside>
  );
}
