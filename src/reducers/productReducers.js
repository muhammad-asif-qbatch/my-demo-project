import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { list: [] };


export const getProductAsync = createAsyncThunk(
    'product/getProduct',
    async () => {
        const response = await fetch("http://localhost:3000/product/products");
        // The value we return becomes the `fulfilled` action payload
        const data = await response.json();
        console.log(data);
        return data;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers:
    {
        [getProductAsync.fulfilled]: (state, action) => {
            state.list = action.payload;
        },
        [getProductAsync.pending]: (state) => {
            state = "pending"
        },
        [getProductAsync.rejected]: (state) => {
            state = "rejected"
        }
    },
});

export default productSlice.reducer;
