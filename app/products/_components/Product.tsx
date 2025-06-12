"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const PRODUCTS_PER_PAGE = 9;
type Product = {
  id: string;
  name: string;
  title?: string;
  description?: string;
  brand?: string;
  dimensions?: string;
  weight?: string;
  manufacture?: string;
  price: number;
  stock: number;
  addInfo?: string;
  material?: string;
  createdAt: Date;

  category?: {
    id: string;
    name: string;
  };

  images: {
    id: string;
    url: string;
  }[];
};

interface ProductFilterProps {
  filters: {
    category: string;
    priceMin: number;
    priceMax: number;
  };
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-4 border p-4 rounded shadow">
      <div className="bg-gray-200 h-48 w-full rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  );
}

export default function ProductsList({ filters }: ProductFilterProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products once
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products");
      setAllProducts(res.data.products);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search + filters
  useEffect(() => {
    let filtered = allProducts;

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category?.name === filters.category
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceMin &&
        product.price <= filters.priceMax &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters, searchQuery, allProducts]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="flex items-center justify-center space-x-2 my-4 max-w-lg mx-auto px-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-grow"
        />
        <Search className="w-6 h-6 text-gray-400" />
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {loading ? (
            Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard
                id={product.id}
                key={product.id}
                name={product.name}
                description={product.title!}
                image={product.images[0].url || ""}
                price={product.price.toString()}
                category={product.category?.name!}
                material={product.material!}
                rating={4}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>

      {!loading && (
        <div className="mt-12 mb-20 flex justify-center items-center gap-4 px-4">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
