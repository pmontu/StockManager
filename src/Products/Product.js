import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../config";
import useForm from "react-hook-form";

function Product() {
  let { id } = useParams();
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(undefined);
  let [product, setProduct] = useState({});
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = productData => {
    setIsLoading(true);
    fetch(`${baseURL}/stocks/products/${product.id}/`, {
      method: "PATCH",
      body: JSON.stringify(productData),
      headers: { "Content-Type": "application/json" }
    })
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
  };

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Name:{" "}
      <input
        name="name"
        ref={register({ required: true })}
        defaultValue={product.name}
      />
      {errors.name && "name is required."}
      <br />
      SKU:{" "}
      <input
        name="sku"
        ref={register({ required: true })}
        defaultValue={product.sku}
      />
      {errors.sku && "sku is required."}
      <br />
      Description:{" "}
      <textarea
        rows={4}
        cols={70}
        name="description"
        ref={register({ required: true })}
        defaultValue={product.description}
      />
      {errors.description && "description is required."}
      <br />
      <input type="submit" value="Save" disabled={isLoading} />
    </form>
  );
}

export default Product;
