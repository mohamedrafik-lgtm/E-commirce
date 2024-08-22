import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../Store';
import { useDispatch } from 'react-redux';

export interface IResearch{
    Name: string;
  Category: string;
  Brand: string;
  MinPrice: number;
  MaxPrice: number;
  MinDiscount: number;
  MaxDiscount: number;
  MinRate: number;
  MaxRate: number;
}
const initialState: IResearch = {
    Name: '',
    Category: '',
    Brand: '',
    MinPrice: 0,
    MaxPrice: 0,
    MinDiscount: 0,
    MaxDiscount: 0,
    MinRate: 0,
    MaxRate: 0,
}

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
