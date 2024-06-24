"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCallbackUrl } from "@/backend/helpers/Helpers";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  console.log("form data", formData);
  const callbackUrl = params.get("callbackUrl");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: callbackUrl ? parseCallbackUrl(callbackUrl) : "/",
    });

    setLoading(false);

    console.log("Data", data);

    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <h2 className="mb-5 text-2xl font-semibold">Loginnn</h2>

      <div className="mb-4">
        <label className="block mb-1"> Email </label>
        <input
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
          type="text"
          placeholder="Type your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1"> Password </label>
        <input
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
          type="password"
          placeholder="Type your password"
          minLength={6}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>

      <button
        type="submit"
        className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
        {loading ? "loading..." : "Login"}
      </button>

      <hr className="mt-4" />

      <p className="text-center mt-5">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-blue-500">
          Register
        </Link>
      </p>
    </form>
  );
}

export default Signin;
