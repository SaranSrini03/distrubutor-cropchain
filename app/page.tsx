import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@cropchain/ui-web";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="overflow-x-auto w-full max-w-3xl">
        <Table className="min-w-full border-collapse border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <TableHeader className="bg-blue-600 text-white">
            <TableRow>
              <TableHead className="py-3 px-6 text-left">Header 1</TableHead>
              <TableHead className="py-3 px-6 text-left">Header 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-white hover:bg-blue-50 transition-colors">
              <TableCell className="py-3 px-6 border-b border-gray-200">Cell 1</TableCell>
              <TableCell className="py-3 px-6 border-b border-gray-200">Cell 2</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50 hover:bg-blue-50 transition-colors">
              <TableCell className="py-3 px-6 border-b border-gray-200">Cell 3</TableCell>
              <TableCell className="py-3 px-6 border-b border-gray-200">Cell 4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
