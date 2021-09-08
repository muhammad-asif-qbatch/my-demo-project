import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducers';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        user: userReducer
    },
});
export default store;