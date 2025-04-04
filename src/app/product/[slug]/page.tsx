'use client'; // Mark this as a client-side component

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { RootState, AppDispatch } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getProducts, getSingleProduct } from '@/redux/slices/ProductSlice';
import Loader from '@/utils/Loader';
import { GrLinkNext } from "react-icons/gr";

export default function Page() {
  const pathname = usePathname();
  const slug = pathname?.split('/').pop(); // Extract slug from the pathname

  const dispatch = useAppDispatch();

  const { loading, error, singleProduct,products } = useAppSelector(
    (state: RootState) => state.product
  );

  function stripHtmlTags(input: string) {
    return input
      .replace(/<[^>]+>/g, '') // Removes HTML tags
      .replace(/&nbsp;/g, ' ') // Replaces &nbsp; with a regular space
      .replace(/&amp;/g, '&'); // Replaces &amp; with the actual '&' symbol
  }

  useEffect(() => {
    if (slug) {
      dispatch(getSingleProduct({ slug }));
    }
    dispatch(getProducts());
  }, [slug, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          {loading && <Loader />}
          {loading && <p className='text-white'>spinner</p>}
          {error && <p>Error: {error}</p>}
          {singleProduct && (
            <div>
              <h2 className="text-xl text-white font-semibold mb-4">{singleProduct.title}</h2>
         
              <Image
                src={`/uploads/${singleProduct.image}`}
                alt={singleProduct.title}
                width={0} // Remove the width property
                height={0} // Remove the height property
                className="w-auto h-auto object-cover rounded-lg mb-6" // Allow the image to display in its original size
                sizes="(max-width: 768px) 100vw, 50vw" // Optional: Helps with responsive resizing
              />

              <p className="text-gray-400 mb-4">
                {singleProduct.content && stripHtmlTags(singleProduct.content)}
              </p>
            </div>
          )}
        </div>

        {/* Right side content */}
        <div className=" p-4 rounded-lg">
          {
           products && products.map((products)=>(
            <a href={`/product/${products.slug}`} className='lg:float-right float-left' key={products._id}>
            <p className='text-white flex gap-20 items-center'>{products.title} <GrLinkNext/></p>
            </a>
           ))
          }
          <p className="text-white text-center"></p>
        </div>
      </div>
    </div>
  );
}
