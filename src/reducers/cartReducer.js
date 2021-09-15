import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forEach } from 'async';
import axios from '../axios-config.js';

const initialState = {
    count: 0,
    id: 0,
    cartList: [],
    deleted: false,
};
const selectedCardList = []
export const saveCardList = (item) => {
    selectedCardList.push(item);
}
export const getCartAsync = createAsyncThunk(
    'cart/getCart',
    async () => {
        try{
        const response = await axios.get("cart/all");
        const data = await response.data;
        return data;
        }
        catch(error){
            console.log(error);
        }
    }
)
export const deleteCartAsync = createAsyncThunk(
    'cart/deleteCart',
    async (body, thunkApi) => {
        try{
            const response = await axios.delete(`/cart/carts/${body.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${body.token}`
                }
            });
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
)
export const postCartAsync = createAsyncThunk(
    'cart/postCart',
    async (body, thunkApi) => {
        try {
            const { id, count, name, price, token } = body;
            const data = {
                id,
                count,
                name,
                price
            }
            const response = await axios.post('/cart/carts', data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue({
                error: error.message
            });
        }
    }
);

export const patchCartAsync = createAsyncThunk(
    'cart/patchCart',
    async (body, thunkApi) => {
        try{
            const response = await axios.patch(`/cart/carts/${body.id}`, { count: body.count }, {
                headers: {
                    Authorization: `bearer ${body.token}` //the token is a variable which holds the token
                }
            });
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
// export const patchCartAsync = createAsyncThunk(
//     'cart/deleteCart',
//     async (body) => {
//         const requestOptions = {
//             method: 'PATCH',
//             body: {
//                 id: body.id,
//                 count: body.count
//             }
//         };
//         const response = await fetch(`http://localhost:3000/cart/carts/${body.id}`, requestOptions);
//         const data = response.json;
//         console.log(data);
//         return data;
//     }
// )

export const getUserSpecificCart = createAsyncThunk(
    'cart/getUserCart/',
    async (token, thunkApi) => {
        try{
            const response = await axios.get('/cart/list', {
                headers: {
                    Authorization: `bearer ${token}` //the token is a variable which holds the token
                }
            });
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
)
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.count = state.count + 1;
            state.count = action
        },
        showCartCount: (state, action) => {
            action.payload(forEach(element => {
                state.count += element;
            }))
        },
        deleteCart: (state, action) => {
            const newList = state.cartList.filter((item) => item.id !== action.payload.id);
            state.cartList = newList;
        },
        updateCartCount: (state, action) => {
            state.count = 0;
        }
    },
    extraReducers: {
        [postCartAsync.fulfilled]: (state) => {
            state.count += 1
            console.log('Data added successfully');
        },
        [postCartAsync.pending]: (state) => {
            console.log('Data is in loading state');
        },
        [postCartAsync.rejected]: (state) => {
            console.log('Oh your request has been rejected! Try next time.');
        },
        [getCartAsync.fulfilled]: (state, action) => {
            let counter = 0;
            let cartLists = []
            action.payload.forEach(element => {
                counter = counter + element.count;
                cartLists.push(element);
            });
            state.cartList = cartLists;
            state.count = counter;
        },
        [getCartAsync.pending]: (state) => {
            console.log('Data is in loading state');
        },
        [getCartAsync.rejected]: (state) => {
            console.log('Oh your request has been rejected! Try next time.');
        },
        [patchCartAsync.fulfilled]: (state, action) => {
            console.log("Data updated successfully")
        },
        [patchCartAsync.rejected]: (state) => {
            console.log("Request rejected!")
        },
        [patchCartAsync.pending]: (state) => {
            console.log("pending state, please wait for the response")
        },
        [getUserSpecificCart.fulfilled]: (state, action) => {
            let counter = 0;
            let cartLists = []
            action.payload.forEach(element => {
                counter = counter + element.count;
                cartLists.push(element);
            });
            state.cartList = cartLists;
            console.log(state.cartList)
            state.count = counter;
        },
        [getUserSpecificCart.pending]: (state) => {
            console.log("In pending state in getsingle fun")
        },
        [getUserSpecificCart.rejected]: (state) => {
            console.log("Oh get by id request rejected.")
        },
        [deleteCartAsync.fulfilled]: (state, action) => {
            console.log('Cart list :', state.cartList);
            const list = state.cartList.filter((item) => ((item.id !== action.payload.id) && (item.user_id !== action.payload.user_id)));
            state.cartList = list;
            console.log(list)
            state.count = state.count - action.payload.count;
            console.log('Data deleted successfully')
        },
        [deleteCartAsync.pending]: (state) => {
            console.log('Data deletetion request is in pending state')
        },
        [deleteCartAsync.rejected]: (state) => {
            console.log('Request is unsucessfull')
        },
    }
});
export const { addToCart, addToCartByAmount, deleteCart, updateCartCount } = cartSlice.actions;
export default cartSlice.reducer;