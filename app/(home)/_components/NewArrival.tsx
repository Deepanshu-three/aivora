'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react'; // Using lucide icons for stars
import ProductCard from '../../../components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Smart Watch',
    price: '$129',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg',
    description: 'Track your health and style with ease.',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: '$89',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg',
    description: 'Crystal clear sound with zero wires.',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: '$59',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg',
    description: 'Bring the party anywhere with powerful sound.',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    price: '$99',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg',
    description: 'Your personal fitness companion.',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Fitness Tracker',
    price: '$99',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/DM/NE/VU/109701326/robot-spare-parts-500x500.jpeg',
    description: 'Your personal fitness companion.',
    rating: 4.0,
  },
];



const NewArrival = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-left mb-10 text-gray-900">
        New Arrivals
      </h2>

      <Carousel
        opts={{ align: 'center', loop: true }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 basis-10/12 sm:basis-6/12 md:basis-4/12"
            >
              <ProductCard name={product.name} rating={product.rating} image={product.image} description={product.description} price={product.price}  />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default NewArrival;
