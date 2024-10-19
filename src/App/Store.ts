// store.ts
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filter';
import productId from './features/productId';
import SearchSlice from './features/Search';
import categoryReducer from './features/categoryId'; 

export const store = configureStore({
    reducer: {
        filterSlice: filterReducer,
        productID: productId,
        Search: SearchSlice,
        category: categoryReducer, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
