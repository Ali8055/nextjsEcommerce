import ProductDetails from "@/components/products/ProductDetails";
import React from "react";

const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL // Use an environment variable for the base URL on the server
    : "";
async function getProductDetails(id) {
  console.log("JADU",baseUrl);
  const response = await fetch(`${baseUrl}/asd/products?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const productData = await response.json()
  console.log(productData,"productData");

  return productData;
}
const ProductDetailsPage = async ({ params }) => {
  const product = await getProductDetails(params.id);
  return <ProductDetails product={product}  />;
};

export default ProductDetailsPage;
