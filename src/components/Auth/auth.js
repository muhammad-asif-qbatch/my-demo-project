import React from 'react';
import { Route, Switch, Redirect, useRouteMatch, Link, useParams } from 'react-router-dom';
import SignUp from './signup';
import SignIn from './signin';
import NotFound from '../NotFound';
const Auth = () => {
    let { path, url } = useRouteMatch();
    console.log('Path: ', path);
    console.log('Url: ', url);
    return (
        <div>

            <h3>Hello from authenticate</h3>

            <Link to={`auth/signup`}>
                Create an account!!!
            </Link>
            <Link to={`/auth/signin`}>
                Have an account! Go on to Login
            </Link>
            <Switch>
                <Route path={`/auth/signup`} component={SignUp} />
                <Route path={`/auth/signin`} component={SignIn} />

            </Switch>

        </div >
    );
}
export default Auth;