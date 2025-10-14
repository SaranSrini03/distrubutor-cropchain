import { Table, TableBody, TableHead, TableHeader, TableRow } from "@cropchain/ui-web";
import ProductRow, { ProductItem } from "./ProductRow";

interface ProductTableProps {
  products: ProductItem[];
  onView?: (product: ProductItem) => void;
  onEdit?: (product: ProductItem) => void;
}

export default function ProductTable({ products, onView }: ProductTableProps) {
  return (
    <div className="border border-green-200 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-green-100">
          <TableRow className="border-b border-green-200">
            <TableHead className="font-mono font-bold py-3 text-green-800">ITEM</TableHead>
            <TableHead className="font-mono font-bold py-3 text-green-800">FARMER</TableHead>
            <TableHead className="font-mono font-bold py-3 text-green-800">STATUS</TableHead>
            <TableHead className="font-mono font-bold py-3 text-green-800 text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} onView={onView} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


