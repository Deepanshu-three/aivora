import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

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
  name: string;
  image: string;
  rating: number;
  price: string;
  description: string;
}

const ProductCard = (product: Product) => {
  return (
    <div className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
      <Card className="overflow-hidden rounded-md bg-white shadow-md">
        <CardHeader className="h-full w-full overflow-hidden ">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-b-sm"
          />
        </CardHeader>

        <CardContent>
          <StarRating rating={product.rating} />
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <span className="text-primary font-bold">{product.price}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </CardContent>

        <CardFooter className="p-4 pt-2">
          <Button className="w-full" variant="default">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
