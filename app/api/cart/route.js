import dbConnect from "@/backend/config/dbConnect";
import Cart from "@/components/cart/Cart";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const {
    productId,
    image,
    productName,
    productPrice,
    seller,
    stock,
    quantity,
    userId,
  } = await req.json();
  console.log("Data", req.json);
  try {
    const cart = await Cart.create({
      productId,
      image,
      productName,
      productPrice,
      seller,
      stock,
      quantity,
      userId,
    });
    console.log("Carttt", cart);
    return NextResponse.json({ message: "Added to cart!", status: 201 });
  } catch (error) {
    console.log("error", error.message);
    return NextResponse.json({
      message: "failed to add in a cart!",
      status: false,
    });
  }
}
