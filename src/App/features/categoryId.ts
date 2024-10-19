// categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProp {
    categoryId: number ;
}

const initialState: IProp = {
    categoryId: 0,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
    },
});

export const { setCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
