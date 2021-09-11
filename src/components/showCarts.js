import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getUserSpecificCart, deleteCartAsync, deleteCart, patchCartAsync } from '../reducers/cartReducer';
//import Cookies from 'coo'
export default function Carts() {

    const cartsList = useSelector((state) => state.cart.cartList);
    const { count } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const token = cookies.get('guestToken');
    const handleIncrement = (obj) => {
        dispatch(patchCartAsync({ count: obj.count + 1, id: obj.id, token: token }));
        dispatch(getUserSpecificCart(token));
    };
    const handleDecrement = (obj) => {
        dispatch(patchCartAsync({ count: obj.count - 1, id: obj.id, token: token }));
        dispatch(getUserSpecificCart(token));
    }
    const handleDelete = async (id) => {
        const data = {
            id: id,
            token: token
        }
        await dispatch(deleteCartAsync(data));
        dispatch(getUserSpecificCart(token));
    }
    useEffect(() => {
        const token = cookies.get('guestToken');
        dispatch(getUserSpecificCart(token));
    }, [])
    return (
        <div style={{ display: 'flex' }}>
            {
                cartsList && cartsList.map((elem, index) => {
                    const { name, price, count, id } = elem;
                    return (
                        <Grid container spacing={3} key={index}>
                            <Grid item key={id}>
                                <h3>Product Name: {name}</h3>
                                <h3>Product Price: {price}</h3>
                                <button onClick={() => {
                                    const data = { count: count, id: id };
                                    handleIncrement(data);
                                }
                                }>+</button>
                                <input placeholder={count} name={id} />
                                <button onClick={() => {
                                    const data = { count: count, id: id }
                                    handleDecrement(data);

                                }}>-</button>
                                <h3>Id: {id}</h3>

                                <button onClick={() => {
                                    handleDelete(id);
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
