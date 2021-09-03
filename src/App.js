import Products from "./components/showProducts";
import NavBar from "./components/NavBar";
import Carts from './components/showCarts';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
  const { count } = useSelector(state => state.cart);
  console.log(count)
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
        </Switch>
      </Router>
    </div>
  )
}
export default App;