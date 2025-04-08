  "use client"
  import React, { useEffect } from 'react';
  import { RootState, AppDispatch } from '@/redux/store';
  import { useAppDispatch, useAppSelector } from '@/redux/hooks';
  import { getSingleBlog,resetState } from '@/redux/slices/BlogSlice';
  import { usePathname } from 'next/navigation';
  import Loader from '@/utils/Loader';
  import Editor from '@/utils/JodEditor';
  import { useRouter } from "next/navigation";
  import Image from 'next/image';
  import Head from 'next/head';
  import DangerousHTML from 'react-dangerous-html';



  interface Blog {
      metatitle: string | null;
      metadescription: string | null;
      metakeyword: string | null;
      metaTitle: string | null;
      metaDescription: string | null;
      image: string | null;
      // other fields...
  }
  const Page = () => {

      const pathname = usePathname();
    const singleslug = pathname?.split('/').pop(); // Extract slug from the pathname
    

    const dispatch = useAppDispatch();
    const router = useRouter(); 

    const { loading, error, message, success,isupdate, singleBlog } = useAppSelector(
      (state: RootState) => state.blog
    );
  console.log(loading)

    function stripHtmlTags(input: string) {
      return input
        .replace(/<[^>]+>/g, '') // Removes HTML tags
      //   .replace(/&nbsp;/g, ' ') // Replaces &nbsp; with a regular space
      //   .replace(/&amp;/g, '&'); // Replaces &amp; with the actual '&' symbol
    }


    useEffect(()=>{
      if (singleslug) {
          dispatch(getSingleBlog(singleslug));
        
        }
    },[singleslug])
    
    return (
      <>
        {singleBlog && (
    <Head>
      <title>{singleBlog?.metatitle || 'Default Title'}</title>
      <meta name="description" content={singleBlog?.metadescription || 'Default description'} />
      <meta name="keywords" content={singleBlog?.metakeyword || 'default, keywords'} />
      <meta property="og:title" content={singleBlog?.metatitle || 'Default OG Title'} />
      <meta property="og:description" content={singleBlog?.metadescription || 'Default OG Description'} />
      <meta property="og:image" content={singleBlog?.image ? `/uploads/${singleBlog.image}` : '/default-image.jpg'} />
  </Head>
 )}
  { loading ? (
    <Loader /> // Show loader if loading is true
  ) : (
    <div className="max-w-7xl mx-auto px-6 py-20 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          {/* {loading && <Loader />} */}
          {error && <p>Error: {error}</p>}
          {singleBlog && (
            <div>
              <h1 className="text-xl text-white font-semibold mb-4">{singleBlog.title}</h1>
              <Image
                src={`/uploads/${singleBlog.image}`}
                alt={singleBlog.title}
                width={0} // Remove the width property
                height={0} // Remove the height property
                className="w-auto h-auto object-cover rounded-lg mb-6" // Allow the image to display in its original size
                sizes="(max-width: 768px) 100vw, 50vw" // Optional: Helps with responsive resizing
              />
              <div className="editor-data mb-4">
              <DangerousHTML html={singleBlog.content} />
             
              </div>
            </div>
          )}
        </div>
        {/* Right side content */}
        <div className="p-4 rounded-lg">
          <div className="text-white text-center"></div>
        </div>
      </div>
    </div>
  )}

      </>
  );

  }

  export default Page