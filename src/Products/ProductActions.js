import React from "react";
import FileUploadProgress from "react-fileupload-progress";
import { baseURL } from "../config";

function ProductActions() {
  return (
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
  );
}

export default ProductActions;
