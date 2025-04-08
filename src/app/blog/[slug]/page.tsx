// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Simulating a data fetch function; this should be a real fetch or DB call
async function getSingleBlogBySlug(slug: string) {
    
  const res = await axios.get(`${baseUrl}/api/blog/${slug}`);
  const blog = await res.data.blog;

  return blog;
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getSingleBlogBySlug(slug); // Use the same fetch here
  if (!blog) return { title: 'Not Found' };

  return {
    metadataBase: new URL('https://yourdomain.com'), // <-- IMPORTANT
    title: blog.metatitle || blog.title,
    description: blog.metadescription || '',
    keywords: blog.metakeywords || '',
    openGraph: {
      title: blog.metatitle || blog.title,
      description: blog.metadescription || '',
      images: blog.image ? [`/uploads/${blog.image}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metatitle || blog.title,
      description: blog.metadescription || '',
      images: blog.image ? [`/uploads/${blog.image}`] : [],
    },
  
  };
}

export default async function Page({ params }: { params: { slug: string } }) {

const { slug } = await params;
  const blog = await getSingleBlogBySlug(slug);
  if (!blog) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 sm:px-8">
      <h1 className="text-xl text-white font-semibold mb-4">{blog.title}</h1>
      {blog.image && (
        <Image
          src={`/uploads/${blog.image}`}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full h-auto object-cover rounded-lg mb-6"
        />
      )}
       <div
        className="editor-data mb-4 text-white"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog.content || ''),
        }}
      />
    </div>
  );
}