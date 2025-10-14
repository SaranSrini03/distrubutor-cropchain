"use client";

import { Button, Input } from "@cropchain/ui-web";

interface HeaderBarProps {
  title?: string;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onOpenQR: () => void;
}

export default function HeaderBar({ title = "Distributor Dashboard -", searchTerm, onSearchTermChange, onOpenQR }: HeaderBarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold shadow-md">
          🌾
        </div>
        <h1 className="text-2xl font-bold text-green-900">{title}</h1>
      </div>

      <div className="flex items-center space-x-3">
        <Input
          placeholder="Search products or farmers..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-60 font-mono text-sm border-green-300 focus:ring-green-500 focus:border-green-500"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenQR}
          className="font-mono text-xs border-green-700 text-green-700 hover:bg-green-100"
        >
          QR
        </Button>
      </div>
    </div>
  );
}


