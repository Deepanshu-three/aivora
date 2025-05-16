"use client"
import { useState } from "react"
import ProductCard from "@/components/ProductCard"

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    rating: 4
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    rating: 4
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    rating: 4
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    rating: 4
  },
  // Add more products here...
  {
    id: 5,
    name: 'Notebook',
    href: '#',
    price: '$10',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Notebook image',
    rating: 3
  },
  {
    id: 6,
    name: 'Smart Mug',
    href: '#',
    price: '$55',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Smart mug',
    rating: 5
  },
  {
    id: 7,
    name: 'Eco Bag',
    href: '#',
    price: '$25',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Eco friendly shopping bag',
    rating: 4
  },
  {
    id: 8,
    name: 'Fountain Pen',
    href: '#',
    price: '$60',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Classic fountain pen',
    rating: 5
  },
  {
    id: 9,
    name: 'Desk Organizer',
    href: '#',
    price: '$40',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Wooden desk organizer',
    rating: 4
  },
  {
    id: 10,
    name: 'Wireless Charger',
    href: '#',
    price: '$70',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Fast wireless charger',
    rating: 4
  },
  {
    id: 8,
    name: 'Fountain Pen',
    href: '#',
    price: '$60',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Classic fountain pen',
    rating: 5
  },
  {
    id: 9,
    name: 'Desk Organizer',
    href: '#',
    price: '$40',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Wooden desk organizer',
    rating: 4
  },
  {
    id: 10,
    name: 'Wireless Charger',
    href: '#',
    price: '$70',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Fast wireless charger',
    rating: 4
  },
  {
    id: 8,
    name: 'Fountain Pen',
    href: '#',
    price: '$60',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Classic fountain pen',
    rating: 5
  },
  {
    id: 9,
    name: 'Desk Organizer',
    href: '#',
    price: '$40',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Wooden desk organizer',
    rating: 4
  },
  {
    id: 10,
    name: 'Wireless Charger',
    href: '#',
    price: '$70',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Fast wireless charger',
    rating: 4
  },
  {
    id: 8,
    name: 'Fountain Pen',
    href: '#',
    price: '$60',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Classic fountain pen',
    rating: 5
  },
  {
    id: 9,
    name: 'Desk Organizer',
    href: '#',
    price: '$40',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Wooden desk organizer',
    rating: 4
  },
  {
    id: 10,
    name: 'Wireless Charger',
    href: '#',
    price: '$70',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Fast wireless charger',
    rating: 4
  },
  // Add more if needed
]

const PRODUCTS_PER_PAGE = 9

export default function ProductsList() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-white borde">
      <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-0">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.imageAlt}
              image={product.imageSrc}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
