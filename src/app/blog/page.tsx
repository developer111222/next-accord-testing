"use client"
import React, { useEffect, useState } from 'react';
import {getAllBlogs,resetState} from '../../redux/slices/BlogSlice'
import { RootState, AppDispatch } from '@/redux/store';
import { useAppDispatch,useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation'
import Loader from '@/utils/Loader';
import { TextHoverEffect } from '@/component/TextHoverEffect';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {

    const dispatch = useAppDispatch();
    // const router = useRouter();
    const { loading, error, message, isdelete, blogs } = useAppSelector(
      (state: RootState) => state.blog
    );
    const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  function stripHtmlTags(input: string) {
    return input.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '); 
  }


  useEffect(() => {
    if(isdelete){
      alert(message)
      dispatch(resetState())
      redirect('/dashboard/blog')
    }
    dispatch(getAllBlogs()); // Dispatching the async action
  }, [dispatch]);

  // Safely handle the case where `products` might be undefined
  const productsList = Array.isArray(blogs) ? blogs : [];

  // Calculate total pages
  const totalPages = Math.ceil(productsList.length / productsPerPage);

  // Slice products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
    {blogs?(
        <div className="min-h-screen max-w-6xl mx-auto bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
          {loading && <Loader />}
          {error && <p>Error: {error}</p>}
          <div className="h-[12rem] flex items-center justify-center">
            <TextHoverEffect text="Blogs" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.slug} // TypeScript now knows 'slug' exists
                className="card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={`/uploads/${blog.image}`}
                  alt={blog.title}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="p-4">
                  <h2 className="text-xl text-white font-semibold mb-2">{blog.title}</h2>  
                  {/* <p className="text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) }} /> */}
    
                  <p className="text-gray-400 mb-4">
                {blog.content && stripHtmlTags(blog.content).length > 100
                  ? stripHtmlTags(blog.content).substring(0, 100) + "..."
                  : stripHtmlTags(blog.content)}
              </p>  
    
    
    
               
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ):(
        <div>
          <h1 className='text-white text-center'>Product not found</h1>
        </div>
      )};
      </>
  )
}

export default Page