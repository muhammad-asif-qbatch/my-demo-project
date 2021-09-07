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
import { postCartAsync, getSingleCartAsync, getCartAsync } from '../reducers/cartReducer';


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
    const add_to_cart = () => {
        dispatch(postCartAsync({ id: props.id, count: 1, name: props.name, price: props.price }));
        dispatch(getCartAsync());
    }
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                <Button size="small" color="primary" onClick={() => { add_to_cart() }}>
                    Add to cart
                </Button>
                <Button size="small" color="primary">
                    Remove from Card
                </Button>
            </CardActions>
        </Card>
    );
}
