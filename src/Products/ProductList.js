import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from "../config";
import Paginator from "./Paginator";
const PAGE_SIZE = 10;

function ProductList() {
  let [products, setProducts] = useState([]);
  let [isLoadingTable, setIsLoadingTable] = useState(false);
  let [maxPages, setMaxPages] = useState(-1);
  let [page, setPage] = useState(1);
  let [error, setError] = useState(undefined);
  let history = useHistory();

  useEffect(() => {
    setIsLoadingTable(true);
    fetch(`${baseURL}/stocks/products/?page=${page}`)
      .then(res => {
        if (!res.ok) throw new Error(`${res.status}:${res.statusText}`);
        return res.json();
      })
      .then(json => {
        setProducts(json.results);
        setMaxPages(Math.ceil(json.count / PAGE_SIZE));
        setIsLoadingTable(false);
      })
      .catch(e => {
        setError(e);
      });
  }, [page]);

  if (error) return `${error}`;
  if (isLoadingTable) return "loading...";
  if (maxPages === -1) return "no data yet";

  return (
    <>
      <Paginator page={page} setPage={setPage} maxPages={maxPages} />
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => history.push(`/products/${product.id}`)}>
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator page={page} setPage={setPage} maxPages={maxPages} />
    </>
  );
}

export default ProductList;
