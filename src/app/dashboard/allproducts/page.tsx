"use client"
import React, { useEffect, useState } from 'react';
import { getProducts,deleteProduct } from '@/redux/slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { useAppDispatch,useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation'
// import { useRouter } from 'next/router';


const Page = () => {
    const dispatch = useAppDispatch();
    // const router = useRouter();
    const { loading, error, message, success, products } = useAppSelector(
      (state: RootState) => state.product
    );
  
 console.log(products)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getProducts()); // Dispatching the async action
  }, [dispatch]);

  // Safely handle the case where `products` might be undefined
  const productsList = Array.isArray(products) ? products : [];

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



  //----------handle edit------

  const handleEdit = (slug: string) => {
  
    redirect(`/dashboard/product/${slug}`);
  };

const handleDelete=(slug:string)=>{
 
if(slug){
  dispatch(deleteProduct({slug}))
}
}

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Content</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product._id || product.slug || Math.random().toString(36).substr(2, 9)}
                  className="border-b"
                >
                  <td className="px-4 py-2 text-sm text-gray-700">{product.title}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <img
                      src={`/uploads/${product.image}`}
                      alt={product.title}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.slug}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      onClick={() => handleEdit(product.slug)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </ul>

      {/* Pagination controls */}
      {productsList.length >= 8 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 disabled:bg-gray-200"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-700 hover:text-white`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
