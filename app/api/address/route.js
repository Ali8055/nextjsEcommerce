import dbConnect from "@/backend/config/dbConnect";
import Address from "@/backend/models/address";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { street, city, state, zipCode, phoneNo, country, userId } =
    await req.json();
  console.log("Data", street, city, state, zipCode, phoneNo, country, userId);
  try {
    const address = await Address.create({
      street,
      city,
      state,
      zipCode,
      phoneNo,
      country,
      userId,
    });
    return NextResponse.json({ message: "Address added!", status: 201 });
  } catch (error) {
    console.log("error", error.message);
    return NextResponse.json({
      message: "failed to add address",
      status: false,
    });
  }
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  // console.log("idddddd", req.userId);
  try {
    const allAddresses = await Address.find({ userId });
    return NextResponse.json({ allAddresses });
  } catch (error) {
    console.log("error", error.message);
    return NextResponse.json(
      {
        message: "failed to fetch addresses",
        status: false,
      },
      { status: 500 }
    );
  }
}
