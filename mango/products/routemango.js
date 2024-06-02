import { NextResponse } from "next/server";
import Product from "@/backend/models/product";
import dbConnect from "@/backend/config/dbConnect";

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
//   const url = new URL(req.url);
//   const searchParams = url.searchParams;
//   console.log("APP URLLL");
//   if (searchParams.has("id")) {
//     try {
//       console.log("MMMMMM");
//       const id = searchParams.get("id");
//       const product = await Product.findById(id);
//       if (!product) {
//         return NextResponse.json(
//           {
//             message: "Product not found",
//             status: false,
//           },
//           { status: 404 }
//         );
//       }
//       return NextResponse.json(product, { status: 200 });
//     } catch (error) {
//         return NextResponse.json(error, { status: false });
//     }
//   } else if ([...searchParams].length === 0) {
//     try {
//       const allProducts = await Product.find();
//       return NextResponse.json(allProducts, { status: 200 });
//     } catch (error) {
//       return NextResponse.json(error, { status: false });
//     }
//   }
// }

// export const getProducts = async (req, res, next) => {
//     const resPerPage = 2;
//     const productsCount = await Product.countDocuments();

//     const apiFilters = new APIFilters(Product.find(), req.query)
//       .search()
//       .filter();

//     let products = await apiFilters.query;
//     const filteredProductsCount = products.length;

//     apiFilters.pagination(resPerPage);

//     products = await apiFilters.query.clone();

//     res.status(200).json({
//       productsCount,
//       resPerPage,
//       filteredProductsCount,
//       products,
//     });
//   };
