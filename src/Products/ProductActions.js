import React, { useState, useEffect } from "react";
import FileUploadProgress from "react-fileupload-progress";
import { baseURL } from "../config";

function ProductActions() {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(undefined);
  let [progress, setProgress] = useState({});

  useEffect(() => {
    // var es = new window.ReconnectingEventSource(`${baseURL}/events/`);
    // es.addEventListener(
    //   "message",
    //   function(e) {
    //     console.log(e.data);
    //   },
    //   false
    // );

    let eventSource = new EventSource(`${baseURL}/events/`);
    eventSource.onmessage = function(event) {
      console.log("New message", event.data);
    };
  }, []);

  if (error) return `${error}`;
  if (isLoading) return "loading...";

  return (
    <>
      {/* Progress:
      {status.map((s, i) => )}
      <br /> */}
      Upload:
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
      <br />
      <button
        onClick={() => {
          fetch(`${baseURL}/stocks/products/`, { method: "delete" })
            .then(res => {
              if (!res.ok) throw new Error(`${res.status}:${res.statusText}`);
              setIsLoading(false);
            })
            .catch(e => {
              setError(e);
            });
        }}
      >
        Delete All
      </button>
    </>
  );
}

export default ProductActions;
