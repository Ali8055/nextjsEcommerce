import { NextResponse } from "next/server";
import Product from "@/backend/models/product";
import dbConnect from "@/backend/config/dbConnect";
import APIfilters from "@/backend/utils/APIfilters";

export async function POST(req) {
  try {
    await dbConnect();
    console.log("MANG");
    let data = await req.json();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "failed to create product",
      status: false,
    });
  }
}

// export async function GET(req) {
//   await dbConnect();
//   try {
//     const allProducts = await Product.find();
//     return NextResponse.json(allProducts, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(error, { status: false });
//   }
// }

export async function GET(req) {
  await dbConnect();

  try {
    const resPerPage = 3;
    const productsCount = await Product.countDocuments();
    console.log("products count", productsCount);
    const url = new URL(req.url);
    const keyword = url.searchParams.get("keyword");
    const category = url.searchParams.get("category");
    const priceLte = url.searchParams.get("price[lte]");
    const priceGte = url.searchParams.get("price[gte]");
    const page = url.searchParams.get("page") || 1; // Default to page 1 if not provided
    console.log(
      "search abc",
      url.searchParams,
      keyword,
      category,
      priceLte,
      page
    );

    const filterOptions = {};

    if (keyword) {
      filterOptions.keyword = keyword;
    }

    if (category) {
      filterOptions.category = category;
    }
    if (priceLte || priceGte) {
      filterOptions.price = {};
      if (priceLte) filterOptions.price.lte = priceLte;
      if (priceGte) filterOptions.price.gte = priceGte;
    }

    let products;
    let filteredProductsCount = 0;

    if (keyword || category || priceLte || priceGte) {
      // for search and filter
      const apiFilters = new APIfilters(Product.find(), {
        ...filterOptions,
        page,
      })
        .search()
        .filter();

      products = await apiFilters.query;
      filteredProductsCount = products.length;

      apiFilters.pagination(resPerPage);
      products = await apiFilters.query.clone(); // Clone the query to avoid side effects
    } else {
      // this is for all products
      const apiFilters = new APIfilters(Product.find(), { page });
      apiFilters.pagination(resPerPage);
      products = await apiFilters.query;
      filteredProductsCount = productsCount;
    }

    return NextResponse.json(
      {
        products,
        productsCount,
        resPerPage,
        filteredProductsCount,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while fetching products",
      status: false,
    });
  }
}

// export async function GET(req) {
//   // const resPerPage = 2;
//   // const productsCount = await Product.countDocuments();

//   const apiFilters = new APIfilters(Product.find(), req.query).search();
//   // .filter();

//   let products = await apiFilters.query;
//   console.log("products", products);
//   // const filteredProductsCount = products.length;

//   // apiFilters.pagination(resPerPage);

//   // products = await apiFilters.query.clone();

//   NextResponse.status(200).json({
//     // productsCount,
//     // resPerPage,
//     // filteredProductsCount,
//     products,
//   });
// }
