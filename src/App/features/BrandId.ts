import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProp {
    BrandId: number | null;
}

const initialState: IProp = {
    BrandId: null,
};

const BrandSlice = createSlice({
    name: 'Brand',
    initialState,
    reducers: {
        setBrandId: (state, action: PayloadAction<number>) => {
            state.BrandId = action.payload;
        },
    },
});

export const { setBrandId } = BrandSlice.actions;
export default BrandSlice.reducer;