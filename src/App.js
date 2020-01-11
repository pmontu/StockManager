import React, { useEffect } from "react";
import ProductList from "./Products/ProductList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import ProductActions from "./Products/ProductActions";
import Product from "./Products/Product";

function App() {
  let history = useHistory();

  useEffect(() => {
    if (history) history.push("/");
  }, [history]);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Products List / Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload | View Upload Progress | Delete All</Link>
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
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
