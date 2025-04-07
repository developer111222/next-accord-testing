"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { RootState, AppDispatch } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getSingleBlog,updateBlog,resetState } from '@/redux/slices/BlogSlice';
import Loader from '@/utils/Loader';
import Editor from '@/utils/JodEditor';
import { useRouter } from "next/navigation";


interface FormData {
  metatitle:string;
  metadescription:string;
  metakeyword:string;
  title: string;
  content: string;
  image: File | null;
  preview: string | null;
  id: string;
  slug: string; // Add slug field
}

const Page = () => {
  const pathname = usePathname();
  const singleslug = pathname?.split('/').pop(); // Extract slug from the pathname
  

  const dispatch = useAppDispatch();
  const router = useRouter(); 

  const { loading, error, message, success,isupdate, singleBlog } = useAppSelector(
    (state: RootState) => state.blog
  );


console.log(loading,"loading")

  const [formData, setFormData] = useState<FormData>({
    metatitle: "",
    metadescription: "",
    metakeyword: "",
    title: "",
    content: "",
    image: null,
    preview: null,
    id: '',
    slug: '', // Initialize slug as an empty string
  });
  

  useEffect(() => {
    if (singleslug) {
      dispatch(getSingleBlog(singleslug));
      dispatch(resetState())
    }
if(error){
  alert(error);
  dispatch(resetState())
}
if(isupdate){
  alert(message)
  dispatch(resetState())
router.push('/dashboard/allblogs')
}
  }, [singleslug, dispatch,error,isupdate]);



  useEffect(() => {
    if (singleBlog) {
      setFormData({
        metatitle: singleBlog.metatitle,
        metadescription: singleBlog.metadescription,
        metakeyword: singleBlog.metakeyword,
        title: singleBlog.title,
        content: singleBlog.content,
        image: null, // We'll use the image preview
        preview: singleBlog.image || null, // Assuming product image is a URL
        id: singleBlog._id, // Assuming product ID is in the response
        slug: singleBlog.slug || '', // Add slug here
      });
    }
  }, [singleBlog]); // Add slug as a dependency
  

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

    const payload = {
      metatitle:formData.metatitle,
      metadescription: formData.metadescription,
      metakeyword: formData.metakeyword,
 
      slug: formData.slug,
      title: formData.title,
      content: formData.content,
      image: formData.image as File, // make sure it's a File
      id: formData.id,
    };
dispatch(updateBlog(payload))
  
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className='flex justify-between gap-30'>
        {/* Title Field */}
        <div className='flex-1'>

        <div className='pb-2'>
          <label htmlFor="metatitle" className="block text-sm font-medium text-gray-700">
           Meta Title
          </label>
          <input
            type="text"
            id="metatitle"
            value={formData.metatitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prevData) => ({
                ...prevData,
                metatitle: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter Metatitle"
            required
          />
        </div>

        {/* Meta Description Field */}
            <div className='pb-2'>
          <label htmlFor="metadescription" className="block text-sm font-medium text-gray-700">Meta Description</label>
          <textarea
            id="metadescription"
            value={formData.metadescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prevData) => ({
                 ...prevData,
                  metadescription: e.target.value,
                }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            rows={4}
            placeholder="Enter Meta Description"
            required
            />
            </div>

            {/* Meta Keyword Field */}
            <div className='pb-2'>
          <label htmlFor="metakeyword" className="block text-sm font-medium text-gray-700">Meta Keyword</label>
          <input
            type="text"
            id="metakeyword"
            value={formData.metakeyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prevData) => ({
                 ...prevData,
                  metakeyword: e.target.value,
                }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter Meta Keyword"
            required
            />
            </div>
        
        <div className='pb-2'>
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

        {/* Content Field */}
     

        {/* Image Upload */}
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
        <div className='my-10'>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
        </div>
        <div className='flex-1'>
        {/* Submit Button */}
       
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