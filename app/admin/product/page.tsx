"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AddProductModal from "./_components/AddProduct";
import EditProductModal from "./_components/EditProduct";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  addInfo: string;
  description: string;
  category?: {
    id: string;
    name: string;
  };
  productImage?: string;
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  const handleProductAdded = () => {
    fetchProducts();
    setIsModalOpen(false);
    router.refresh();
  };

  const handleProductUpdated = () => {
    fetchProducts();
    setIsEditModalOpen(false);
    router.refresh();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0C6170]">Products</h1>
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>List of all products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category?.name || "-"}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditProduct(product);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {isEditModalOpen && editProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onProductUpdated={handleProductUpdated}
          product={editProduct}
        />
      )}
    </div>
  );
};

export default Page;
