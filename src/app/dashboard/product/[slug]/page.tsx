"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { RootState, AppDispatch } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getSingleProduct,updateProduct,resetState } from '@/redux/slices/ProductSlice';
import Loader from '@/utils/Loader';
import Editor from '@/utils/JodEditor';
import { useRouter } from "next/navigation";


interface FormData {
  title: string;
  content: string;
  image: File | null;
  preview: string | null;
  id: string;
  slug: string; // Add slug field
}

const Page = () => {
  const pathname = usePathname();
  const slug = pathname?.split('/').pop(); // Extract slug from the pathname

  const dispatch = useAppDispatch();
  const router = useRouter(); 

  const { loading, error, message, success,isupdate, singleProduct } = useAppSelector(
    (state: RootState) => state.product
  );


  // const [formData, setFormData] = useState({
  //   title: "",
  //   content: "",
  //   image: null as File | null,
  //   preview: null as string | null, // This will hold the preview image URL
  //   id:''
  // });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    image: null,
    preview: null,
    id: '',
    slug: '', // Initialize slug as an empty string
  });
  

  useEffect(() => {
    if (slug) {
      dispatch(getSingleProduct({ slug }));
      dispatch(resetState())
    }
if(error){
  alert(error);
  dispatch(resetState())
}
if(isupdate){
  alert(message)
  dispatch(resetState())
router.push('/dashboard/allproducts')
}
  }, [slug, dispatch,error,isupdate]);

  // useEffect(() => {
  //   if (singleProduct) {
  //     setFormData({
  //       title: singleProduct.title,
  //       content: singleProduct.content,
  //       image: null, // We'll use the image preview
  //       preview: singleProduct.image || null, // Assuming product image is a URL
  //       id: singleProduct._id, // Assuming product ID is in the response
  //     });
  //   }
  // }, [singleProduct]);

  useEffect(() => {
    if (singleProduct) {
      setFormData({
        title: singleProduct.title,
        content: singleProduct.content,
        image: null, // We'll use the image preview
        preview: singleProduct.image || null, // Assuming product image is a URL
        id: singleProduct._id, // Assuming product ID is in the response
        slug: slug || '', // Add slug here
      });
    }
  }, [singleProduct, slug]); // Add slug as a dependency
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
        preview: URL.createObjectURL(file), // Preview the uploaded image
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


dispatch(updateProduct({formData}))
  
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        {loading && <Loader />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-30">
          {/* Title Field */}
          <div className="flex-1">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Enter title"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {formData.image===null ? (
                    <img
                    src={`/uploads/${formData.preview}`} // Correctly point to the preview URL
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-md"
                    />
                  ) : (
                    
                    <img
                    src={formData.preview || "/uploads/avtar.jpg"}  // If no preview, use the fetched product image
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-md"
                    />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="my-10">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Product
              </button>
            </div>
          </div>

          <div className="flex-1">
            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Editor formData={formData} setFormData={setFormData} />
            </div>

           
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;