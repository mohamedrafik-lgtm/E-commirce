import { configureStore } from '@reduxjs/toolkit'
import  filterReducer  from './features/filter'
import productId from './features/productId'
import  SearchSlice  from './features/Search'


// ...

export const store = configureStore({
    reducer : {
        filterSlice:filterReducer,
        productID:productId,
        Search:SearchSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch