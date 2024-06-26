import dbConnect from "@/backend/config/dbConnect";
import Cart from "@/backend/models/cart";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { cartDetails, userId } = await req.json();
  console.log("Data", cartDetails, userId);
  try {
    for (const item of cartDetails) {
      await Cart.create({
        productId: item.product,
        image: item.image,
        productName: item.name,
        productPrice: item.price,
        seller: item.seller,
        stock: item.stock,
        quantity: item.quantity,
        userId,
      });
    }
    // console.log("Carttt", cart);
    return NextResponse.json({ message: "Added to cart!", status: 201 });
  } catch (error) {
    console.log("error", error.message);
    return NextResponse.json({
      message: "failed to add in a cart!",
      status: false,
    });
  }
}
