import React, { useEffect } from 'react';
import Cart from './Cart';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAsync, deleteCartAsync } from '../reducers/cartReducer'
export default function Carts() {

    const cartsList = useSelector((state) => state.cart.cartList);
    const dispatch = useDispatch();
    const deleteFromCart = async (id) => {
        console.log(id)
        await dispatch(deleteCartAsync(id));
        dispatch(getCartAsync())
    }
    useEffect(() => dispatch(getCartAsync()), [])
    return (
        <div style={{ display: 'flex' }}>
            {
                cartsList && cartsList.map((elem, index) => {
                    return (
                        <Grid container spacing={3}>
                            <Grid item>
                                <h3>Product Name: {elem.name}</h3>
                                <h3>Product Price: {elem.price}</h3>
                                <input value={elem.count} />
                                <h3>Id: {elem.id}</h3>
                                <button onClick={() => deleteFromCart(elem.id)}>Remove from Cart</button>
                            </Grid>
                        </Grid>
                    )
                }
                )
            }

        </div >
    )
}
