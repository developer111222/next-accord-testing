import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Product interface
interface Product {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
}

// Define the initial state structure
interface ProductState {
  products: Product[];  // Ensure this is always an array
  loading: boolean;
  error: string | null;
  message: string | null;
  success: boolean;
  isupdate: boolean;
  isdelete: boolean;
  singleProduct: Product | null; // Updated to allow null
}

// Initial state for the products
const initialState: ProductState = {
  products: [],
  singleProduct: null, // Initialize as null
  loading: false,
  error: null,
  message: null,
  success: false,
  isupdate: false,
  isdelete: false,
};

// Create the reducer for the products slice

// Create Product
export const createProduct = createAsyncThunk<
  Product & { message: string },
  { title: string; content: string; image: File | null }
>(
  'product/createProduct',
  async ({ title, content, image }) => {
    if (!image) throw new Error('Image is required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image); // Add the file as part of the FormData

    try {
      const response = await axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure to send the correct content type
        },
      });
      console.log(response.data);
      return {
        ...response.data, // Spread the product data
        message: response.data.response, // Include the success message from the server
      };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error creating product';
      throw new Error(errorMessage); // Throw the error with the actual message from the server
    }
  }
);

// Get Products
export const getProducts = createAsyncThunk<Product[]>(
  'product/getProducts',
  async () => {
    try {
      const response = await axios.get('/api/product');

      return response.data.products;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error fetching products';
      throw new Error(errorMessage); // Throw the error with the actual message from the server
    }
  }
);

// Get Single Product
export const getSingleProduct = createAsyncThunk<Product, { slug: string }>(
  'product/getSingleProduct',
  async ({ slug }) => {

    try {
      const response = await axios.get(`/api/product/${slug}`);

      return response.data.product;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error fetching product';
      throw new Error(errorMessage);
    }
  }
);

//------------------ delete product by id--------------

export const deleteProduct = createAsyncThunk<Product & { message: string }, { slug: string }>(
  'product/deleteProduct',
  async ({ slug }) => {
    try {
      const response = await axios.delete(`/api/product/${slug}`);
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

//------------------------patch by id------------------

export const updateProduct = createAsyncThunk<Product & { message: string }, { slug: string, title: string, content: string, image: File,id:string}>('product/updateProduct',
  async ({ title, content, image,id }) => {
    console.log(id,title,content,image)
    // if (!image) throw new Error('Image is required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image); // Add the file as part of the FormData
    
    try {
      const response = await axios.patch(`/api/product/${id}`,formData, {
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



// Create a slice of the Redux store for products
const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Reset the state (useful for clearing out data after certain actions)
    resetState: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
      state.message = null;
      state.success = false;
      state.isupdate = false;
      state.isdelete = false;
      state.singleProduct = null; // Reset singleProduct to null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product & { message: string }>) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload);  // Append to products array
        state.message = action.payload.message || "created successfully"; // Now 'message' exists in the payload

      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || 'Error creating product';

      })
      // Handle getProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload; // Replace the entire product array with the new data
        state.error = null;
        state.success = true;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products'; // Use error message from API response
        state.products = [];
        // state.message = null;
        state.success = false;
      })
      // Handle getSingleProduct
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.singleProduct = action.payload; // Replace the entire singleProduct with the new data
        state.error = null;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product'; // Use error message from API response
        state.singleProduct = null; // Reset singleProduct on error
        // state.message = null;
        state.success = false;
      })

      //-----deletye product

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;

      })

      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<Product & { message: string }>) => {

        state.loading = false;
        state.isdelete = true;



        state.message = action.payload.message;
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.isdelete = false;
        state.error = action.error.message || 'Failed to delete product';
        state.message = null;
        state.success = false;
      })

      //-----update product

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product & { message: string }>) => {
        state.loading = false;
        state.isupdate = true;
        state.error = null;
        state.message = action.payload.message || 'updated succesfully';
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.isupdate = false;
        state.error = action.error.message || 'Failed to update product';
        // state.message = action.message"updated succesfully";
        state.success = false;
      })

      
  },
});

// Export the action and reducer
export const { resetState } = ProductSlice.actions;
export default ProductSlice.reducer;
