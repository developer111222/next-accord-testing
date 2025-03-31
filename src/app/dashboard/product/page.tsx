"use client"
import { useState, FormEvent, useEffect } from 'react';
import { createProduct} from '@/redux/slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Editor from '../../../utils/JodEditor';

export default function Product() {
  const dispatch: AppDispatch = useDispatch(); // Correct typing for dispatch
  const { loading, error, message, success, products } = useSelector(
    (state: RootState) => state.product
  );

  // Use one useState for all form fields (title, content, image, preview)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null as File | null,
    preview: null as string | null,
  });



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


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.title || !formData.content || !formData.image) {
      alert('All fields are required');
      return;
    }

    dispatch(createProduct(formData));
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
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

        {/* Content Field */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <Editor formData={formData} setFormData={setFormData} />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {formData.preview ? (
                <img
                  src={formData.preview}
                  alt="Preview"
                  className="mx-auto h-32 w-32 object-cover rounded-md"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>

     
    </div>
  );
}
