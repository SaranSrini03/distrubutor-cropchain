interface StatusPillProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready":
      return "bg-green-100 text-green-800 border-green-300";
    case "In transit":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Processing":
      return "bg-orange-100 text-orange-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export default function StatusPill({ status }: StatusPillProps) {
  return (
    <span className={`font-mono text-xs py-1 px-2 border rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}


