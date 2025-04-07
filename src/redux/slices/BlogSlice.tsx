import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Blog {
  _id: string;
  metatitle: string;
  metadescription: string;
  metakeyword: string;
  title: string;
  content: string;
  image: string;
  slug:string
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  message: string | null;
  success: boolean;
  iscreate: boolean;
  isupdate: boolean;
  isdelete: boolean;
  singleBlog: Blog | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  message: null,
  success: false,
  iscreate: false,
  isupdate: false,
  isdelete: false,
  singleBlog: null,
};

//----------------------------- Actions -----------------

export const createBlog = createAsyncThunk<Blog & { message: string }, {
  metatitle: string;
  metadescription: string;
  metakeyword: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  image: File | null;
}>(
  'blog/createBlog',
  async ({ title, content, image, metatitle, metadescription, metakeyword }) => {
    if (!image) throw new Error('Image is required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('metatitle', metatitle);
    formData.append('metadescription', metadescription);
    formData.append('metakeyword', metakeyword);

    try {
      const response = await axios.post('/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return {
        ...response.data, // Spread the blog data
        message: response.data.response, // Include the success message from the server
      };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error creating blog post';
      throw new Error(errorMessage);
    }
  }
);

//---------------------------get all blog-------------------

export const getAllBlogs = createAsyncThunk<Blog[]>('blog/getAllBlogs', async () => {
  try {
    const response = await axios.get('/api/blog');
    console.log(response.data)
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Error fetching blog posts';
    throw new Error(errorMessage);
  }
});

//--------------------------------get single blog---------------------

export const getSingleBlog = createAsyncThunk<Blog, string>(
  'blog/getSingleBlog',
  async (slug: string) => { console.log(slug,"slice slug")
    try {
      const response = await axios.get(`/api/blog/${slug}`);
   
      return response.data.blog;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error fetching blog post';
      throw new Error(errorMessage);
    }
  }
);

//------------------------get delete blog-------------------

export const deleteBlog = createAsyncThunk<Blog & { message: string }, { slug: string }>(
  'blog/deleteBlog',
  async ({ slug }) => {
    try {
      const response = await axios.delete(`/api/blog/${slug}`);
      return {
        ...response.data, // Spread the product data
        message: response.data.response, // Include the success message from the server
      };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error deleting product';
      throw new Error(errorMessage);
    }
  }
)


export const updateBlog = createAsyncThunk<Blog & { message: string }, { slug: string, title: string, content: string, image: File,id:string,metatitle:string,metadescription:string,metakeyword:string}>('blog/updateBlog',
  async ({ title, content, image,id,metatitle,metadescription,metakeyword }) => {
    
    // if (!image) throw new Error('Image is required');

    const formData = new FormData();
   
    formData.append('metatitle', metatitle);
    formData.append('metadescription', metadescription);
    formData.append('metakeyword', metakeyword);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image); // Add the file as part of the FormData
    
    try {
      const response = await axios.patch(`/api/blog/${id}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure to send the correct content type
        },
      });
      console.log(response.data);
      return {
        ...response.data, // Spread the product data
        message: response.data.message, // Include the success message from the server
      };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error creating product';
      throw new Error(errorMessage); // Throw the error with the actual message from the server
    }
  }
);


const BlogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetState: (state) => {
      state.blogs = [];
      state.loading = false;
      state.error = null;
      state.message = null;
      state.success = false;
      state.isupdate = false;
      state.isdelete = false;
      state.iscreate = false;
      state.singleBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = false;
        state.iscreate = false;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog & { message: string }>) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message || "created succesffully";
        state.success = true;
        state.iscreate = true;
        state.blogs.push(action.payload); // Assuming you want to add the new blog to the blogs array
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create blog';
        state.message = null;
        state.success = false;
        state.iscreate = false;
      })

      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = false;
      })
      .addCase(getAllBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.error = null;
        state.message = null;
        state.success = true;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog posts';
        state.message = null;
        state.success = false;
      })

      //-----------get single blog
      .addCase(getSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = false;
      })
      .addCase(getSingleBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.error = null;
        state.message = null;
        state.success = true;
        state.singleBlog = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog post';
        state.message = null;
        state.success = false;
      })

      //-----------get delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = false;
        state.isdelete = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<Blog & { message: string }>) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message || "deleted succesffully";
        state.success = true;
        state.isdelete = true;
        state.blogs = state.blogs.filter((blog) => blog._id!== action.payload._id); // Assuming you want to remove the deleted blog from the blogs array
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete blog';
        state.message = null;
        state.success = false;
        state.isdelete = false;
      })

//--------------update blog-------
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = false;
        state.isupdate = false;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog & { message: string }>) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message || "updated succesffully";
        state.success = true;
        state.isupdate = true;
        state.blogs = state.blogs.map((blog) => (blog._id === action.payload._id? action.payload : blog)); // Assuming you want to update the blog in the blogs array
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update blog';
        state.message = null;
        state.success = false;
        state.isupdate = false;
      });
    
  },
});

export const { resetState } = BlogSlice.actions;
export default BlogSlice.reducer;
