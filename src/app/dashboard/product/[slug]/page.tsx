"use client";
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { RootState, AppDispatch } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getSingleProduct } from '@/redux/slices/ProductSlice';

const Page = () => {
  const pathname = usePathname();
  const slug = pathname?.split('/').pop(); // Extract slug from URL path

  const dispatch = useAppDispatch();

  const { loading, error, message, success, singleProduct } = useAppSelector(
    (state: RootState) => state.product
  );

  // Dispatch the action to fetch a single product when the slug changes
  useEffect(() => {
 
      dispatch(getSingleProduct({slug})); 
   
  }, [slug, dispatch]); // Dependency on `slug` to re-fetch whenever the slug changes



  return (
    <div>
      <h1>Product Details</h1>
      <p>Product slug: {slug}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {singleProduct && (
        <div>
          <h2>{singleProduct.title}</h2>
          <img
            src={`/uploads/${singleProduct.image}`}
            alt={singleProduct.title}
            style={{ width: '200px' }}
          />
          <p>{singleProduct.content}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
