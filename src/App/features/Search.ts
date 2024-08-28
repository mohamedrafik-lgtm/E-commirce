import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../Store';
import { useDispatch } from 'react-redux';
import { ISearchValue } from '../../interface';


const initialState: ISearchValue[] = [];

export const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    
    setSearchSlice: (_, action: PayloadAction<ISearchValue[]>) => {
      return action.payload;
    }
  },
})


export const useAppDispatch: () => AppDispatch = useDispatch


export const { setSearchSlice } = SearchSlice.actions;
export default SearchSlice.reducer;