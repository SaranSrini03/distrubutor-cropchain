import { Button, TableCell, TableRow } from "@cropchain/ui-web";
import StatusPill from "./StatusPill";

export interface ProductItem {
  id: number;
  name: string;
  farmer: string;
  status: string;
}

interface ProductRowProps {
  product: ProductItem;
  onView?: (product: ProductItem) => void;
  onEdit?: (product: ProductItem) => void;
}

export default function ProductRow({ product, onView, onEdit }: ProductRowProps) {
  return (
    <TableRow className="border-b border-green-100 hover:bg-green-50 transition">
      <TableCell className="py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-xs font-bold text-green-900">
            {product.name.charAt(0)}
          </div>
          <div>
            <div className="font-mono text-sm text-green-900">{product.name}</div>
            <div className="font-mono text-xs text-green-700">ID: {product.id}</div>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-300 text-green-900 text-xs flex items-center justify-center font-bold">
            {product.farmer.charAt(0)}
          </div>
          <span className="font-mono text-sm text-green-900">{product.farmer}</span>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <StatusPill status={product.status} />
      </TableCell>

      <TableCell className="py-3 text-right">
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="font-mono text-xs h-8 px-3 text-green-700 hover:bg-green-100"
            onClick={() => onView?.(product)}
          >
            VIEW
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="font-mono text-xs h-8 px-3 text-green-700 hover:bg-green-100"
            onClick={() => onEdit?.(product)}
          >
            EDIT
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}


