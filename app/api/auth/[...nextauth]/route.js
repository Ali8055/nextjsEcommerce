import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentails", credentials), await dbConnect();
        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        console.log("ispasswordmatched", isPasswordMatched);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };

// important to export

// Export GET handler
export async function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

// Export POST handler
export async function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
