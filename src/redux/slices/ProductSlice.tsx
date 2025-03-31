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
}

// Initial state for the products
const initialState: ProductState = {
  products: [],  // Ensure this is an empty array initially
  loading: false,
  error: null,
  message: null,
  success: false,
};

// Create the reducer for the products slice

export const createProduct = createAsyncThunk<Product, { title: string; content: string; image: File | null }>(
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
          'Content-Type': 'multipart/form-data', // Make sure to send the correct content type
        },
      });

      return response.data; // Return the created product
    } catch (error: any) {
      // Check if the error has a response object (for API errors)
      const errorMessage = error?.response?.data?.message || 'Error creating product';
      throw new Error(errorMessage); // Throw the error with the actual message from the server
    }
  }
);

//-----------------get product slice----------------

export const getProducts = createAsyncThunk<Product[]>(
  'product/getProducts',
  async () => {
    try {
      const response = await axios.get('/api/product');
      return response.data.product;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error fetching products';
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
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state (when the async action is in progress)
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      // Handle fulfilled state (when the async action succeeds)
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.success = true;
        if (Array.isArray(state.products)) {
            state.products.push(action.payload); // Append to products array
          } else {
            state.products = [action.payload]; // Initialize products if not an array
          } // Ensure immutability by spreading the old array
        state.message = action.payload.message;
        state.error = null;
      })
      // Handle rejected state (when the async action fails)
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        // Use the error message from the API response or fallback to a generic error
        state.error = action.error.message || 'Error creating product';
        state.message = null;
      })
      //------------------------------handling get products-----
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload; // Replace the entire product array with the new data
        state.error = null;
        state.message = 'Products fetched successfully';
        state.success = true;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products'; // Use error message from API response
        state.products = [];
        state.message = null;
        state.success = false;
      });
  },
});

// Export the action and reducer
export const { resetState } = ProductSlice.actions;
export default ProductSlice.reducer;
