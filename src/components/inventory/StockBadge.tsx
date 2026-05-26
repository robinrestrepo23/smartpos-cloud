interface Props {
  status: "high" | "medium" | "low";
}

export default function StockBadge({ status }: Props) {
  const styles = {
    high: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    low: "bg-red-500/20 text-red-400",
  };

  const labels = {
    high: "Disponible",
    medium: "Limitado",
    low: "Crítico",
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-xl text-sm font-medium
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
}
