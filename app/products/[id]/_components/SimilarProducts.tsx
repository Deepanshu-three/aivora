"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
  description: string;
  category: string;
  material: string;
};

const SkeletonCard = () => (
  <div className="animate-pulse space-y-4 p-4 border rounded-xl shadow-sm">
    <div className="h-40 bg-gray-300 rounded-md" />
    <div className="h-4 bg-gray-300 rounded w-3/4" />
    <div className="h-4 bg-gray-300 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
  </div>
);

const SimilarProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch("/api/products/bestseller");
        const data = await res.json();
        const transformed = data.products.map(
          (product: any): Product => ({
            id: product.id,
            name: product.name,
            image: product.images[0]?.url || "",
            rating: 4 + Math.random(), // demo rating
            price: `${product.price}`,
            description: product.description || "",
            category: product.category?.name || "",
            material: product.material || "N/A",
          })
        );

        setProducts(transformed);
      } catch (error) {
        console.error("Error loading best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-left mb-10 text-gray-900">
        You may also like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                rating={product.rating}
                image={product.image}
                description={product.description}
                price={product.price}
                category={product.category}
                material={product.material}
              />
            ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
