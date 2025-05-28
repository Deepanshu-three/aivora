'use client';

import ProductCard from '@/components/ProductCard';
import React from 'react';

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
];

const SimilarProducts = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-16 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={" "}
            name={product.name}
            rating={product.rating}
            image={product.image}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
