import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAsync, deleteCartAsync, deleteCart, patchCartAsync } from '../reducers/cartReducer'
export default function Carts() {

    const cartsList = useSelector((state) => state.cart.cartList);
    const { count } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    // const deleteFromCart = async (id) => {
    //     console.log(`Id passed from components: ${id}`)
    //     await dispatch(deleteCart(id));
    //     await dispatch(deleteCartAsync(id));
    //     //dispatch(getCartAsync());
    // }
    useEffect(() => {
        dispatch(getCartAsync())
        //deleteFromCart();
    }, [count])
    return (
        <div style={{ display: 'flex' }}>
            {
                cartsList && cartsList.map((elem, index) => {
                    return (
                        <Grid container spacing={3}>
                            <Grid item key={index}>
                                <h3>Product Name: {elem.name}</h3>
                                <h3>Product Price: {elem.price}</h3>
                                <button onClick={() => {
                                    dispatch(patchCartAsync({ count: elem.count + 1, id: elem.id }));
                                    dispatch(getCartAsync());
                                }
                                }>+</button>
                                <input placeholder={elem.count} name={elem.id} />
                                <button onClick={() => {
                                    dispatch(patchCartAsync({ id: elem.id, count: elem.count - 1 }));
                                    dispatch(getCartAsync());

                                }}>-</button>
                                <h3>Id: {elem.id}</h3>

                                <button onClick={() => {
                                    dispatch(deleteCartAsync(elem.id))
                                }
                                }>Remove from Cart</button>

                            </Grid>
                        </Grid>
                    )
                }
                )
            }

        </div >
    )
}
