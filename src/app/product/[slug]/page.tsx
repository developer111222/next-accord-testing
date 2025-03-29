'use client'; // Mark this as a client-side component

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define the product type
interface Product {
  id: number;
  slug: string;
  name: string;
  productimage: string;
  bottomimg: string;
  description: string;
}

export default function Page() {
  const pathname = usePathname();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (pathname) {
      const slug = pathname.split('/').pop(); // Extract the last part of the path

      const fetchData = async () => {
        const res = await fetch('/products.json');
        const data: Product[] = await res.json(); // Define the type of data here
        const productData = data.find((item) => item.slug === slug); // Now TypeScript knows the type of 'item'
        console.log(productData, 'data');
        setProduct(productData || null); // Make sure to handle the case where productData might be undefined
      };
      fetchData();
    }
  }, [pathname]);

  if (!product) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        
        {product.productimage && (
          <Image
            src={product.productimage}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-100 object-cover rounded-lg mb-6"
          />
        )}
        
        <p className="text-lg text-gray-400 pb-4">{product.description}</p>
        
        {product.bottomimg && (
          <img
            src={product.bottomimg}
            alt="Bottom image"
            className="w-full object-contain rounded-lg mb-6"
          />
        )}
      </div>
    </div>
  );
}
