import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../Store';
import { useDispatch } from 'react-redux';

export interface IResearch{
   productId:number | null
}
const initialState: IResearch = {
    productId:null
}


export const productId = createSlice({
  name: 'productID',
  initialState,
  reducers: {
    setProductId:(state, action: PayloadAction<number>)=>{
        state.productId = action.payload
    }
  },
})

export const useAppDispatch:()=> AppDispatch = useDispatch
export const { setProductId } = productId.actions;
export default productId.reducer;