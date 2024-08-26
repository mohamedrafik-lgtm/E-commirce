import { configureStore } from '@reduxjs/toolkit'
import  filterReducer  from './features'
import productId from './features/productId'


// ...

export const store = configureStore({
    reducer : {
        filterSlice:filterReducer,
        productID:productId
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch