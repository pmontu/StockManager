import React, { useState, useEffect } from "react";
import { baseURL } from "../config";
import Paginator from "./Paginator";
const PAGE_SIZE = 10;

function ProductList() {
  let [products, setProducts] = useState([]);
  let [isLoadingTable, setIsLoadingTable] = useState(false);
  let [maxPages, setMaxPages] = useState(-1);
  let [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoadingTable(true);
    fetch(`${baseURL}/stocks/products/?page=${page}`)
      .then(res => res.json())
      .then(json => {
        setProducts(json.results);
        setMaxPages(Math.ceil(json.count / PAGE_SIZE));
        setIsLoadingTable(false);
      });
  }, [page]);

  if (maxPages === -1) return "no data yet";

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
      <Paginator page={page} setPage={setPage} maxPages={maxPages} />
    </>
  );
}

export default ProductList;
