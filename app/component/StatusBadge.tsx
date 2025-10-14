// app/products/component/ProductTable.tsx
"use client";

interface Product {
  id: number;
  name: string;
  farmer: string;
  status: string;
  action: string;
}

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
}

export default function ProductTable({ products, onView, onEdit }: ProductTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Farmer
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.farmer}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.status}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-2">
              <button
                onClick={() => onView(product)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                View
              </button>
              <button
                onClick={() => onEdit(product)}
                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
