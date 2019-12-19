import React, { useState, useEffect } from "react";
import { baseURL } from "./config";
const PAGE_SIZE = 20;

function ProductList() {
  let [products, setProducts] = useState([]);
  let [isLoadingTable, setIsLoadingTable] = useState(false);
  let [pages, setPages] = useState(-1);
  let [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoadingTable(true);
    fetch(`${baseURL}/stocks/products/?page=${page}`)
      .then(res => res.json())
      .then(json => {
        setProducts(json.results);
        setPages(Math.ceil(json.count / PAGE_SIZE));
        setIsLoadingTable(false);
      });
  }, [page]);

  if (pages === -1) return "no data yet";

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Description</th>
          </tr>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array(pages)
        .fill()
        .map((val, idx) => idx + 1)
        .map(pageNum => (
          <button key={pageNum} onClick={() => setPage(pageNum)}>
            {pageNum}
          </button>
        ))}
    </>
  );
}

export default ProductList;
