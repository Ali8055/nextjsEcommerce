import React from "react";
import SignUp from "@/components/auth/Signup";

function Signup() {
  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
      <SignUp />
    </div>
  );
}

export default Signup;
