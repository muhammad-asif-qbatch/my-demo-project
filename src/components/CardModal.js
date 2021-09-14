import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getSpecificProduct } from '../reducers/productReducers';

const CardModal = (props) => {
    const {id} = useParams();
    const description = useSelector(state => state.product.productDescription);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpecificProduct(id));
    }, [id]);
 
    return (
        <div style={{
            height: 'fitContent', minHeight: '450px', width: '21%', position: 'fixed', zIndex: '1', top: '90px',
            padding: '0px 15px 20px', right: '15px', backgroundColor: '#0c5853', textAlign: 'center'
        }}>
            <h1>{description}</h1>
        </div>
    );
}
export default CardModal;