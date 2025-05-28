import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star className="w-4 h-4 fill-yellow-400/50 stroke-yellow-400/50" />
      )}
    </div>
  );
};

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
  description: string;
}

const ProductCard = (product: Product) => {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div className="group flex flex-col justify-between bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full cursor-pointer">
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(`/products/${product.id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push(`/products/${product.id}`);
          }
        }}
      >
        {/* Image */}
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-grow p-4 space-y-2">
          <StarRating rating={product.rating} />
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.name}
            </h3>
            <span className="text-primary font-bold">{product.price}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product.id)}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
