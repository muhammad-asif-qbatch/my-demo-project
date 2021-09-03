import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
//import { getProductAsync } from '../reducers/productReducers';
import { NavLink } from 'react-router-dom';
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
    //console.log(count);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        My Ecommerce Website
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
