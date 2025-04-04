'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TextHoverEffect } from '@/component/TextHoverEffect';
import Image from 'next/image';
import { RootState, AppDispatch } from '../../redux/store';
import { useAppDispatch,useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation'
import { getProducts } from '@/redux/slices/ProductSlice';
import Loader from '@/utils/Loader';



export default function Page() {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const { loading, error, message, success, products } = useAppSelector(
    (state: RootState) => state.product
  );

  function stripHtmlTags(input: string) {
    return input.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '); 
  }

  useEffect(() => {
    dispatch(getProducts()); // Dispatching the async action
  }, [dispatch]);

  

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
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
              src={`/uploads/${product.image}`}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="p-4">
              <h2 className="text-xl text-white font-semibold mb-2">{product.title}</h2>  
              {/* <p className="text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: product.content.substring(0, 100) }} /> */}

              <p className="text-gray-400 mb-4">
            {product.content && stripHtmlTags(product.content).length > 100
              ? stripHtmlTags(product.content).substring(0, 100) + "..."
              : stripHtmlTags(product.content)}
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