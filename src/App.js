import React, { useEffect, useState } from "react";

function App() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    if (products.length === 0) {
      fetch("http://localhost:8000/stocks/products/")
        .then(res => res.json())
        .then(products => setProducts(products));
    }
  }, []);
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>name</th>
          </tr>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
