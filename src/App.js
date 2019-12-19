import React from "react";
import { baseURL } from "./config";
import FileUploadProgress from "react-fileupload-progress";
import ProductList from "./ProductList";

function App() {
  return (
    <div className="App">
      <ProductList />
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
