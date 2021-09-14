import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { postCartAsync, getUserSpecificCart } from '../reducers/cartReducer';
import Cookies from 'universal-cookie';
import CardModal from './CardModal';
import { getSpecificProduct } from '../reducers/productReducers';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();
    const cartList = useSelector((state) => state.cart.cartList);
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const token = cookies.get('guestToken');
    const { name, description, price, image, id } = props;
    const add_to_cart = () => {
        if (token) {
            dispatch(postCartAsync({ id: id, count: 1, name: name, price: price, token: token }));
            dispatch(getUserSpecificCart(token));
        }
    }
    const handleSpecificProduct = (id) => {
        dispatch(getSpecificProduct(id));
    }

    const { path, url } = useRouteMatch();
    return (
        <Card className={classes.root} key={id}>
            <CardActionArea>
                <Link to={`${url}/modal/${props.id}`} onClick={() => {
                    handleSpecificProduct(id);
                }}>
                    <CardMedia
                        className={classes.media}
                        image={image}

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => { add_to_cart() }}>
                    Add to cart
                </Button>
                <Button size="small" color="primary">
                    Remove from Card
                </Button>
            </CardActions>
            <Route path={`${path}/modal/:id`}>
                <CardModal />
            </Route>
        </Card>
    );
}
