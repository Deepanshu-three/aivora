"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCart } from "@/app/context/CartContext";

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
  <div className="animate-pulse space-y-4 p-4 border rounded-xl shadow-sm bg-white">
    <div className="h-40 bg-gray-300 rounded-md" />
    <div className="h-4 bg-gray-300 rounded w-3/4" />
    <div className="h-4 bg-gray-300 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
  </div>
);

const NewArrival = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch("/api/products/recent");
        const data = await res.json();

        const transformed: Product[] = data.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          image: product.images[0]?.url || "",
          rating: 4 + Math.random(), // Random rating
          price: `₹${product.price}`,
          description: product.description || "",
          category: product.category?.name || "",
          material: product.material || "N/A",
        }));

        setProducts(transformed);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-left mb-10 text-gray-900">
        New Arrivals
      </h2>

      <Carousel
        opts={{ align: "center", loop: true }}
        className="w-full max-w-6xl mx-auto relative p-10"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-10/12 sm:basis-6/12 md:basis-4/12 py-10"
                >
                  <SkeletonCard />
                </CarouselItem>
              ))
            : products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-10/12 sm:basis-6/12 md:basis-4/12 py-10"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    rating={product.rating}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                    material={product.material}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </section>
  );
};

export default NewArrival;
