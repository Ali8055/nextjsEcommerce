"use client";

import React from "react";
import Filters from "../layouts/Filters";

import ProductItem from "./ProductItem";
import CustomPagination from "../layouts/Pagination";

const ListProducts = ({ data }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data && data.products.length > 0 ? (
              <>
                {data?.products.map((product) => (
                  <ProductItem key={product?._id} product={product} />
                ))}
                <CustomPagination
                  resPerPage={data?.resPerPage}
                  productsCount={data?.filteredProductsCount}
                />
              </>
            ) : (
              <p className="text-center p-10 font-semibold text-lg">
                No products found.
              </p>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
