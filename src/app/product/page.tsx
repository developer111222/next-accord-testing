'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TextHoverEffect } from '@/component/TextHoverEffect';
import Image from 'next/image';

// Define the Product type based on your expected data structure
interface Product {
  slug: string;
  name: string;
  description: string;
  productimage: string;
}

export default function Page() {
  // Provide the Product[] type to useState
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/products.json');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="h-[15rem] flex items-center justify-center">
        <TextHoverEffect text="OUR PRODUCTS" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.slug} // TypeScript now knows 'slug' exists
            className="card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={product.productimage}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="p-4">
              <h2 className="text-xl text-white font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-400 mb-4">
                {product.description.substring(0, 100)}...
              </p>
              <Link
                href={`/product/${product.slug}`}
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}