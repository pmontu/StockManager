import React from "react";

function Paginator({ page, setPage, maxPages }) {
  let left = page - 2;
  if (left < 1) left = 1;
  let right = page + 2;
  if (right > maxPages) right = maxPages;

  return (
    <>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        first
      </button>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        back
      </button>
      {Array(right - left + 1)
        .fill()
        .map((val, idx) => left + idx)
        .map(pageNum => (
          <button
            disabled={pageNum === page}
            key={pageNum}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      <button disabled={page === maxPages} onClick={() => setPage(page + 1)}>
        next
      </button>
      <button disabled={page === maxPages} onClick={() => setPage(maxPages)}>
        last
      </button>
    </>
  );
}

export default Paginator;
