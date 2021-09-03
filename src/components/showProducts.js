import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAsync } from '../reducers/productReducers';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import { getCartAsync } from '../reducers/cartReducer';
//import '../../public/image.css';
const Products = () => {
    const list = useSelector((state) => state.product.list);
    const count = useSelector((state) => state.cart.count);
    console.log(count);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductAsync())
        dispatch(getCartAsync());

    }, []);
    return (
        <Grid container spacing={8}>
            {
                list && list.map((elem, index) => {
                    return (
                        <Grid item xs={3}>
                            <Card key={index} name={elem.name} description={elem.description} image={elem.image} price={elem.price} quantity={elem.quantity} count={count} id={elem.id} />
                            {/* <h3 style={{ color: "black" }} key={elem.id}>{elem.name}</h3> */}
                            {/* <img src={elem.image} alt={elem.description} className="imgCSS" height='200px' width='200px' /> */}
                        </Grid>

                    )
                }
                )
            }
            {/* <button onClick={() => dispatch(getProductAsync())}><span>Check List</span></button> */}
        </Grid>
    )
}
export default Products