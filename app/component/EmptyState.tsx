interface EmptyStateProps {
  visible: boolean;
  primaryText?: string;
  secondaryText?: string;
}

export default function EmptyState({ visible, primaryText = "NO PRODUCTS FOUND", secondaryText = "TRY DIFFERENT SEARCH" }: EmptyStateProps) {
  if (!visible) return null;
  return (
    <div className="text-center py-12">
      <div className="text-green-300 mb-2 text-2xl">🌱</div>
      <div className="font-mono text-sm text-green-700">{primaryText}</div>
      <div className="font-mono text-xs text-green-400 mt-1">{secondaryText}</div>
    </div>
  );
}


