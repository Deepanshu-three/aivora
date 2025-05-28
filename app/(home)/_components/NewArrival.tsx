"use client";

import ProductCard from "../../../components/ProductCard";
import { CarouselPrevious, CarouselNext, Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';


const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: "$129",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg",
    description: "Track your health and style with ease.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: "$89",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg",
    description: "Crystal clear sound with zero wires.",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: "$59",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg",
    description: "Bring the party anywhere with powerful sound.",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: "$99",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg",
    description: "Your personal fitness companion.",
    rating: 4.3,
  },
  {
    id: 5,
    name: "Fitness Tracker",
    price: "$99",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg",
    description: "Your personal fitness companion.",
    rating: 4.0,
  },
];

const NewArrival = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-20 ">
      <h2 className="text-3xl sm:text-4xl font-bold text-left mb-10 text-gray-900">
        New Arrivals
      </h2>

      <Carousel
        opts={{ align: "center", loop: true }}
        className="w-full max-w-6xl mx-auto relative p-10" 
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 basis-10/12 sm:basis-6/12 md:basis-4/12 py-10"
            >
              <ProductCard
                name={product.name}
                rating={product.rating}
                image={product.image}
                description={product.description}
                price={product.price}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Add navigation buttons */}
        <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </section>
  );
};

export default NewArrival;
