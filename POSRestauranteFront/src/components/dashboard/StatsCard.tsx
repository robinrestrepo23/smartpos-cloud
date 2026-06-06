import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
}

export default function StatsCard({ title, value, icon, trend }: Props) {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-5
      flex
      flex-col
      gap-4
      shadow-lg
    "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div
          className="
          w-14 h-14
          rounded-2xl
          bg-blue-600/20
          flex items-center justify-center
          text-blue-400
        "
        >
          {icon}
        </div>
      </div>

      {trend && <p className="text-sm text-green-400">{trend}</p>}
    </div>
  );
}
