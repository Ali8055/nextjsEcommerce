import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();
  console.log("req.json", name, email, password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log("error: error.message,", error.message);
    return NextResponse.json({
      message: "failed to register user",
      status: false,
      error: error.message,
    });
  }
}
