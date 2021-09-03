import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forEach } from 'async';
import axios from 'axios';

const initialState = {
    count: 0,
    id: 0,
    cartList: [],
};
const selectedCardList = []
export const saveCardList = (item) => {
    selectedCardList.push(item);
    console.log(selectedCardList)
}


export const getCartAsync = createAsyncThunk(
    'cart/getCart',
    async () => {
        const response = await axios.get("http://localhost:3000/cart/all");
        const data = await response.data;
        console.log(data);
        return data;
    }
)

export const deleteCartAsync = createAsyncThunk(
    'cart/deleteCart',
    async (id) => {
        const response = await axios.delete(`http://localhost:3000/cart/carts/${id}`);
        const data = await response.data;
        return data;
    }
)

// Async function for API Post call
export const postCartAsync = createAsyncThunk(
    'cart/postCart',
    async (body) => {
        try {

            const response = await axios.post('http://localhost:3000/cart/carts', body);
            return response.data;

        }
        catch (error) {
            console.log(error)
        }
    }
);

export const patchCartAsync = createAsyncThunk(
    'cart/patchCart',
    async (body) => {

        const response = await axios.post(`http://localhost:3000/cart/carts/`, body);
        const data = await response.data;
        return data;
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

export const getSingleCartAsync = createAsyncThunk(
    'cart/getSingleCart',
    async (body) => {
        const response = await axios.get(`http://localhost:3000/cart/all`, { params: { id: body.id } });
        // The value we return becomes the `fulfilled` action payload
        const data = await response.data;
        return data;
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.count = state.count + 1;
        },
        showCartCount: (state, action) => {
            action.payload(forEach(element => {
                state.count += element;
            }))
        },
        //addToCartByAmount: (state, action) => state.count + action.payload
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
            let cartList = []
            action.payload.forEach(element => {
                counter = counter + element.count;
                cartList.push(element);
            });
            state.cartList = cartList;
            console.log(state.cartList)
            state.count = counter;
        },
        [getCartAsync.pending]: (state) => {
            console.log('Data is in loading state');
        },
        [getCartAsync.rejected]: (state) => {
            console.log('Oh your request has been rejected! Try next time.');
        },
        [patchCartAsync.fulfilled]: (state) => {
            console.log("Data updated successfully")
        },
        [patchCartAsync.rejected]: (state) => {
            console.log("Request rejected!")
        },
        [patchCartAsync.pending]: (state) => {
            console.log("pending state, please wait for the response")
        },
        [getSingleCartAsync.fulfilled]: (state, action) => {
            state.preCount = action.payload.count;
        },
        [getSingleCartAsync.pending]: (state) => {
            console.log("In pending state in getsingle fun")
        },
        [getSingleCartAsync.rejected]: (state) => {
            console.log("Oh get by id request rejected.")
        },
        [deleteCartAsync.fulfilled]: (state) => {
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

export const { addToCart, addToCartByAmount } = cartSlice.actions;
export default cartSlice.reducer;