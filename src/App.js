import React, { useState } from "react";
import { baseURL } from "./config";
import FileUploadProgress from "react-fileupload-progress";
import ReactTable from "react-table";
import "react-table/react-table.css";
const PAGE_SIZE = 10;

const columns = [
  {
    Header: "Name",
    accessor: "name", // String-based value accessors!
    width: 150
  },
  {
    Header: "SKU",
    accessor: "sku",
    width: 175
  },
  {
    Header: "Description", // Required because our accessor is not a string
    accessor: "description"
  }
];

function App() {
  let [products, setProducts] = useState([]);
  let [isLoadingTable, setIsLoadingTable] = useState(false);
  let [pages, setPages] = useState(-1);
  let [page, setPage] = useState(0);
  // console.log("yes page", page + 1);
  return (
    <div className="App">
      <ReactTable
        data={products}
        columns={columns}
        manual
        showPageSizeOptions={false}
        loading={isLoadingTable}
        pageSize={PAGE_SIZE}
        pages={pages}
        page={page}
        onFetchData={() => {
          // console.log("yes fetch page", page + 1);
          setIsLoadingTable(true);
          fetch(`${baseURL}/stocks/products/?page=${page + 1}`)
            .then(res => res.json())
            .then(json => {
              setProducts(json.results);
              setPages(Math.ceil(json.count / PAGE_SIZE));
              setIsLoadingTable(false);
            });
        }}
        onPageChange={pageIndex => {
          setPage(pageIndex);
          // console.log("yes pageIndex, page after setting", pageIndex, page + 1);
        }}
      />
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
