import Products from "./components/showProducts";
import NavBar from "./components/NavBar";
import Carts from './components/showCarts';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from "./components/Auth/signup";
import SignIn from "./components/Auth/signin";
function App() {
  let loggedIn = useSelector((state) => state.user.currentState);
  return (
    <div>
      <Router>
        <NavBar />
        <br />
        <br />
        <Switch>
          <Route exact path="/">
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