import Signin from "@/components/auth/SIgnin";
import React from "react";

function signin() {
  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
      <Signin />
    </div>
  );
}

export default signin;
