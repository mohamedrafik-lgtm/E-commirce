// store.ts
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filter';
import productId from './features/productId';
import SearchSlice from './features/Search';
import categoryReducer from './features/categoryId';
import BrandReducer from './features/BrandId';


export const store = configureStore({
    reducer: {
        filterSlice: filterReducer,
        productID: productId,
        Search: SearchSlice,
        category: categoryReducer, 
        Brand: BrandReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



