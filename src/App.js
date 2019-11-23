import React, { useEffect, useState } from "react";
import { baseURL } from "./config";
import FileUploadProgress from "react-fileupload-progress";

function App() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    if (products.length === 0) {
      fetch(`${baseURL}/stocks/products/`)
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
      <FileUploadProgress
        key="ex1"
        url={`${baseURL}/stocks/upload-product-csv/`}
        method="post"
        onProgress={(e, request, progress) => {
          console.log("progress", e, request, progress);
        }}
        onLoad={(e, request) => {
          console.log("load", e, request);
        }}
        onError={(e, request) => {
          console.log("error", e, request);
        }}
        onAbort={(e, request) => {
          console.log("abort", e, request);
        }}
      />
    </div>
  );
}

export default App;
