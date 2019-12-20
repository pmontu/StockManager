import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../config";

function Product() {
  let { id } = useParams();
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(undefined);
  let [product, setProduct] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseURL}/stocks/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`${res.status}:${res.statusText}`);
        return res.json();
      })
      .then(json => {
        setProduct(json);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
      });
  }, [id]);

  if (error) return `${error}`;
  if (isLoading) return "loading...";
  return <div>{id}</div>;
}

export default Product;
