// components/StatusBadge.tsx
interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const config = {
      completed: { color: "bg-green-100 text-green-800 border-green-200", label: "Completed" },
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pending" },
      active: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Active" },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", label: "Cancelled" },
      default: { color: "bg-gray-100 text-gray-800 border-gray-200", label: status }
    };

    return config[status as keyof typeof config] || config.default;
  };

  const { color, label } = getStatusConfig(status.toLowerCase());

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
      <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-70"></span>
      {label}
    </span>
  );
}