"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Truck,
  IndianRupee,
  MessageCircleQuestion,
  RefreshCcw,
  TruckIcon,
  Loader2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SimilarProducts from "./_components/SimilarProducts";
import axios from "axios";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";
import ImageCarousel from "@/components/ImageCarousel";

type Product = {
  id: string;
  brand?: string;
  manufacture?: string;
  dimensions?: string;
  weight?: string;
  title?: string;
  name: string;
  price: number;
  stock: number;
  addInfo: string;
  description: string;
  images: {
    id: string;
    url: string;
  }[];
  category?: {
    id: string;
    name: string;
  };
};

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star className="w-6 h-6 fill-yellow-400/50 stroke-yellow-400/50" />
      )}
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white px-6 py-12">
        <div className="max-w-5xl mx-auto animate-pulse space-y-10">
          {/* Image Skeleton */}
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 h-96 bg-gray-200 rounded-xl" />

            {/* Text skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-gray-200 rounded-md w-3/4" />
              <div className="h-6 bg-gray-200 rounded-md w-1/2" />
              <div className="h-6 bg-gray-200 rounded-md w-full" />
              <div className="h-10 bg-gray-200 rounded-md w-1/3" />
              <div className="h-8 bg-gray-200 rounded-md w-1/4" />
              <div className="h-6 bg-gray-200 rounded-md w-1/3" />
              <div className="h-12 bg-gray-200 rounded-md w-full mt-4" />
            </div>
          </div>

          {/* Detail Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-md w-1/3" />
            <div className="h-20 bg-gray-200 rounded-md w-full" />

            <div className="h-8 bg-gray-200 rounded-md w-1/3" />
            <div className="h-24 bg-gray-200 rounded-md w-full" />

            <div className="h-8 bg-gray-200 rounded-md w-1/3" />
            <div className="h-32 bg-gray-200 rounded-md w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        Product not found
      </div>
    );
  }

  const rating = 4;
  console.log(product?.images)

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* Product Image + Details */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            {product?.images  && (
                <ImageCarousel images={product.images} />
              )}
          </div>

          <div className="flex-1 space-y-4 text-base sm:text-lg">
            <h1 className="text-3xl sm:text-4xl font-bold">{product!.name}</h1>
            <StarRating rating={rating} />
            <p className="text-gray-700">{product!.title}</p>

            <div className="text-2xl sm:text-3xl font-semibold text-primary">
              ₹{product!.price}
            </div>

            <Badge className="w-fit mt-2 text-sm sm:text-base px-3 py-1">
              Category: {product!.category?.name}
            </Badge>

            <div className="text-gray-600">
              {product!.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  In Stock ({product!.stock})
                </span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            <span>Delivering across India in 4–14 days</span>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="flex-1 text-base sm:text-lg py-5"
                disabled={product!.stock === 0 || cartLoading}
                onClick={() => addToCart(product!.id)}
              >
                {cartLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Add to cart"
                )}
              </Button>
            </div>
            <div className="text-gray-600">
              {product!.price > 1000 ? (
                <span className="text-green-600 font-medium">
                  Eligible for free delivery
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-10 text-sm sm:text-base lg:text-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700 leading-relaxed">
              {product!.description} This product is crafted with quality
              materials to ensure durability and long-lasting use. Perfect for
              everyday usage or special occasions.
            </p>
          </div>

          {/* Additional Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Additional Information
            </h2>
            <p>{product!.addInfo}</p>
          </div>

          <div className="max-w-md bg-white border border-gray-300 rounded-md shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5 text-gray-900">
              Manufacture Information
            </h2>
            <ul className="text-gray-700 space-y-3">
              {[
                { label: "Brand", value: product!.brand },
                { label: "Dimensions", value: product!.dimensions },
                { label: "Manufacture", value: product!.manufacture },
                { label: "Weight", value: product!.weight },
              ].map(({ label, value }) => (
                <li key={label} className="flex">
                  <strong className="w-32">{label}:</strong>
                  <span>{value || "NA"}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Delivery & Order Info
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <TruckIcon className="  w-5 h-5 mt-1" />
                Free delivery on orders above ₹1000
              </li>
              <li className="flex items-start gap-3">
                <MessageCircleQuestion className=" w-5 h-5 mt-1" />
                Tracking ID will be shared on WhatsApp
              </li>
              <li className="flex items-start gap-3">
                <RefreshCcw className=" w-5 h-5 mt-1" />
                Orders can be cancelled before shipping.
              </li>
              <li className="ml-8 font-semibold">
                We offer replacements only — no refunds.
              </li>
            </ul>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Similar Products
          </h2>
          <SimilarProducts />
        </div>
      </div>
    </div>
  );
}
