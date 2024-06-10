import React from "react";
import ListProducts from "./../components/products/ListProducts";
import queryString from "query-string";

const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL // Use an environment variable for the base URL on the server
    : "";

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };
  const searchQuery = queryString.stringify(urlParams);
  console.log("Searchquery", searchQuery);
  const response = await fetch(`${baseUrl}/api/products/?${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const homePage = async ({ searchParams }) => {
  console.log("sssss", searchParams);
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // console.log(`${baseUrl}/api/productsss`, "aaaaaaaaaaaaaaaa");

  // const productsData = await response.json();
  const productsData = await getProducts(searchParams);

  return <ListProducts data={productsData} />;
};

export default homePage;
