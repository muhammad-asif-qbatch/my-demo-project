import Products from "./components/showProducts";
import NavBar from "./components/NavBar";
import Carts from './components/showCarts';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import SignUp from "./components/Auth/signup";
import SignIn from "./components/Auth/signin";
function App() {
  const loggedIn = useSelector(state => state.user.currentState);
  return (
    <div>
      <Router>
        <NavBar />
        <br />
        <br />
        <Switch>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/carts">
            <Carts />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            {loggedIn ? <Redirect to='/products' /> : <SignIn />}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
export default App;