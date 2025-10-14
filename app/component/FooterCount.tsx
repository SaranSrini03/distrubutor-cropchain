interface FooterCountProps {
  total: number;
  filtered: number;
}

export default function FooterCount({ total, filtered }: FooterCountProps) {
  return (
    <div className="mt-4 text-center">
      <div className="font-mono text-xs text-green-700">
        {filtered} / {total} ITEMS
      </div>
    </div>
  );
}


