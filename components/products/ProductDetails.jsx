import React from "react";
import BreadCrumbs from "../layouts/BreadCrumbs";
import ProductDetailsPage from "./ProductDetailsPage";

// import NewReview from "../reviews/NewReview";
// import Reviews from "../reviews/Reviews";


const ProductDetails = ({ product }) => {
  const breadCrumbs = [
    { name: "Home", url: "/" },
    {
      name: `${product?.name?.substring(0, 100)} ...`,
      url: `/product/${product?._id}`,
    },
  ];
  return (
    <>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="bg-white py-10 ">
        <ProductDetailsPage product={product} />
      </section>
    </>
  );
};

export default ProductDetails;
