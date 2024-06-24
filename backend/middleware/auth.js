import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

const isAuthenticatedUser = async (req, next) => {
  //   const { data: session, status } = useSession();
  const { session } = useSession(req);

  if (!session) {
    return NextResponse.json({
      message: "Login first to access this route!",
      status: 401,
    });
  }

  req.userId = session.user;
  NextResponse.next();
};

export { isAuthenticatedUser };
