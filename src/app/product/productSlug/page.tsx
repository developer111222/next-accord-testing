'use client';
import React, { useEffect } from 'react';
import { RootState, AppDispatch } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getProducts, getSingleProduct } from '@/redux/slices/ProductSlice';
import { GrLinkNext } from "react-icons/gr";
import Loader from '@/utils/Loader';
import Link from 'next/link';

const Page = () => {

   
  
    const dispatch = useAppDispatch();
  
    const { loading, error, singleProduct,products } = useAppSelector(
      (state: RootState) => state.product
    );

    useEffect(() => {
      
        dispatch(getProducts());
      }, [dispatch]);

  return (
    <div>
           {loading && <Loader />}
         {
           products && products.map((products)=>(
            <Link href={`/product/${products.slug}`} className='lg:float-right float-left pb-4 ' key={products._id}>
            <p className='text-white flex gap-20 items-center'>{products.title} <GrLinkNext/></p>
            </Link>
           ))
          }
    </div>
  )
}

export default Page