import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios-config';
const initialState = { 
    list: [],
    productDescription: " "
};
export const getProductAsync = createAsyncThunk(
    'product/getProduct',
    async (thunkApi) => {
        try{
            const response = await axios.get("product/products");
            const data = await response.data;
            return data;
        }
        catch(error){
            console.log(error);
            return thunkApi.rejectWithValue({
                error: error.message
            });
        }
    }
);
export const getSpecificProduct = createAsyncThunk(
    'product/getSpecificProduct',
    async (id, thunkApi) => {
        try{
            const response = await axios.get(`product/products/${id}`);
            return  response.data;
        }
        catch(error){
            console.log(error);
            return thunkApi.rejectWithValue({
                error: error.message
            });
        }
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
            console.log('pending');
        },
        [getProductAsync.rejected]: (state) => {
            console.log('rejected');
        },
        [getSpecificProduct.fulfilled]: (state, action) => {
            state.productDescription = action.payload[0].description;
        },
        [getSpecificProduct.rejected]: (state, action) => {
            console.log(action.payload)
        },
        [getSpecificProduct.pending]: (state, action) => {
            console.log(action.payload)
        }
    },
});

export default productSlice.reducer;
