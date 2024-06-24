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
        console.log("credentails checking next auth", credentials),
          await dbConnect();
        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");
        console.log("user23", user);

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        console.log("ispasswordmatched", isPasswordMatched);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // if (user) {
      //   token.id = user.id;
      //   token.name = user.name;
      //   token.email = user.email;
      //   token.avatar = user.avatar;
      //   token.createdAt = user.createdAt;
      // }
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      // session.user.id = token.id;
      // session.user.name = token.name;
      // session.user.email = token.email;
      // session.user.avatar = token.avatar;
      // session.user.createdAt = token.createdAt;
      session.user = token.user;
      delete session?.user?.password;

      return session;
    },
  },
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
