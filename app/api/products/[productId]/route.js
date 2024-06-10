import dbConnect from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  console.log("APP URLLL");
  if (searchParams.has("id")) {
    try {
      console.log("MMMMMM");
      const id = searchParams.get("id");
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json(
          {
            message: "Product not found",
            status: false,
          },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json(error, { status: false });
    }
  }
}
