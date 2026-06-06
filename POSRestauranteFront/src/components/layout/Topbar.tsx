import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between">
      {/* LEFT */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <p className="text-sm text-slate-400 mt-1">Bienvenido de nuevo 👋</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 h-11 rounded-xl w-72">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-500"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition">
          <Bell size={18} />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 h-11 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-blue-600" />

          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin</p>

            <p className="text-xs text-slate-400">Restaurante</p>
          </div>
        </div>
      </div>
    </header>
  );
}
