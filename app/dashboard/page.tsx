// app/products/page.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import Head from "next/head";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Avatar, AvatarFallback, Button, Input } from "@cropchain/ui-web";


export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Tomato", farmer: "Naveen", status: "Ready for pickup", action: "completed" },
    { id: 2, name: "Rice", farmer: "Rajesh", status: "In transit", action: "completed" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Products Management</title>
        <meta name="description" content="Products management system" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />

            <Button >
              {/* Other Icon */}
              <svg
                className="h-6 w-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </Button>
          </div>
        </header>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Current</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{product.farmer}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.status}</Badge>

                  </TableCell>
                  <TableCell className="text-right">
                    {product.action === "completed" && (
                      <Button variant="ghost" className="text-green-600 hover:text-green-900 p-1">
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
