import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
//import { getProductAsync } from '../reducers/productReducers';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateLoggedInfo } from '../reducers/userReducer';
import { updateCartCount } from '../reducers/cartReducer';
import Cookies from 'universal-cookie';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    signup: {
        color: "white",
    },
    login: {
        padding: '0 20px'
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const count = useSelector((state) => state.cart.count);
    const { email, currentState } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const cookies = new Cookies();
    const removeToken = () => {
        cookies.remove('guestToken');
        console.log(currentState);
        dispatch(updateLoggedInfo());
        // dispatch(updateCartCount());
        history.push('/signin');
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        My Ecommerce Website
                    </Typography>
                    <NavLink to='/signup'>
                        <Typography variant="h6" className={classes.signup}>
                            SignUp
                        </Typography>
                    </NavLink>
                    <Button color="inherit" onClick={() => removeToken()}>Logout</Button>

                    <Typography variant="h6" className={classes.login}>
                        {email}
                    </Typography>
                    <IconButton aria-label="cart">
                        <NavLink to="/carts">
                            <StyledBadge badgeContent={count} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </NavLink>

                    </IconButton>


                </Toolbar>
            </AppBar>
        </div>
    );
}
