import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAsync } from '../reducers/productReducers';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import { getCartAsync } from '../reducers/cartReducer';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
const Products = () => {
    const list = useSelector((state) => state.product.list);
    const count = useSelector((state) => state.cart.count);
    const cookies = new Cookies();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductAsync())
        dispatch(getCartAsync());
        if (!cookies.get('guesttoken')) {
            const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            cookies.set('guesttoken', randomToken, { path: '/' });
        }
    }, []);
    return (
        <Grid container spacing={8}>
            {
                list && list.map((elem, index) => {
                    return (
                        <Grid item xs={3} key={index}>
                            <Card name={elem.name} description={elem.description} image={elem.image} price={elem.price} quantity={elem.quantity} count={count} id={elem.id} />
                        </Grid>
                    )
                }
                )
            }
        </Grid>
    )
}
export default Products