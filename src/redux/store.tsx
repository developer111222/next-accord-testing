import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/ProductSlice';

export const store=configureStore({
    reducer: {
        product: productReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store