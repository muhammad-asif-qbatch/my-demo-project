import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios-config';
const initialState = { list: [] };


export const getProductAsync = createAsyncThunk(
    'product/getProduct',
    async () => {
        const response = await axios.get("product/products");
        // The value we return becomes the `fulfilled` action payload
        const data = await response.data;
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
            console.log('pending')
            state = "pending"
        },
        [getProductAsync.rejected]: (state) => {
            console.log('rejected')
            state = "rejected"
        }
    },
});

export default productSlice.reducer;
