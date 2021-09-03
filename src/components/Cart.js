import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartAsync, getCartAsync } from '../reducers/cartReducer';
const Cart = (props) => {
    const dispatch = useDispatch();
    const deleteFromCart = async (id) => {
        console.log(id)
        await dispatch(deleteCartAsync(id));
        dispatch(getCartAsync())
    }

    return (
        <Grid container spacing={3}>
            <Grid item>
                <h3>Product Name: {props.name}</h3>
                <h3>Product Price: {props.price}</h3>
                <input value={props.quantity} />
                <h3>Id: {props.id}</h3>
                <button onClick={() => deleteFromCart(props.id)}>Remove from Cart</button>
            </Grid>
        </Grid>


    );
}
export default Cart;