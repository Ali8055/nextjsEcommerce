import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";
import Pagination from "react-js-pagination";

function CustomPagination({ resPerPage, productsCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;

  const handlePageChange = (currentPage) => {
    console.log("currentpage", currentPage);
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }

      //   const path = window.location.pathname + "?" + queryString.toString();
      const path = `${window.location.pathname}?${queryString.stringify(
        Object.fromEntries(queryParams)
      )}`;
      console.log("path", path);
      router.push(path);
    }
  };
  return (
    <div className="flex mt-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productsCount}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="relative inline-flex cursor-pointer items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        activeLinkClassName="z-10 cursor-pointer inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
        activeClass="z-10 inline-flex cursor-pointer items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
      />
    </div>
  );
}

export default CustomPagination;
