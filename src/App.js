import React from "react";
import ProductList from "./Products/ProductList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductActions from "./Products/ProductActions";
import Product from "./Products/Product";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Products List / Home</Link>
            </li>
            <li>
              <Link to="/upload">
                Upload | View Upload Progress | Delete All
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact={true} path="/products/:id">
            <Product />
          </Route>
          <Route exact={true} path="/upload">
            <ProductActions />
          </Route>
          <Route exact={true} path="/">
            <ProductList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
