import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../Store';
import { useDispatch } from 'react-redux';

export interface IResearch{
  productId: number| null;
  productName:string;
  imageUrl:string;
  discount:number;
  rate?:number;
  unitPrice:number;
}
const initialState: IResearch[] = []

export const filter = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setFilterSlice:(state, action: PayloadAction<IResearch>)=>{
        Object.assign(state, action.payload);
    }
  },
})

export const useAppDispatch:()=> AppDispatch = useDispatch
export const { setFilterSlice } = filter.actions;
export default filter.reducer;
