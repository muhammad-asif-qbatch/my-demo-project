import Products from "./components/showProducts";
import NavBar from "./components/NavBar";
import Carts from './components/showCarts';
import React from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from "./components/Auth/signup";
import SignIn from "./components/Auth/signin";
import NotFound from "./components/NotFound";
import Auth from "./components/Auth/auth";
function App() {
  let loggedIn = useSelector((state) => state.user.currentState);
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <br />
        <br />
        <Switch>
          {/* <Route path="/auth">
            <Auth />
          </Route> */}
          <Route path="/products">
            <Products />
          </Route>
          <Route exact path="/carts">
            {loggedIn ? <Carts /> : <Redirect to='/signin' />}
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route path="/not-found" component={NotFound} />
          <Redirect from='*' to='/not-found' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
export default App;