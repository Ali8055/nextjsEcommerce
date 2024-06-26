"use client";
import React from "react";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/redux/cartSlice/slice";
import { useSession } from "next-auth/react";

const Header = () => {
  const cartDetails = useSelector(selectCartItems);
  const { data: session, status } = useSession();
  console.log("session data", session?.user, status);

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <a href="/">
              <Image
                src="/images/default_product.svg"
                height="40"
                width="120"
                alt="BuyItNow"
              />
            </a>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300">
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart (<b>{cartDetails.length}</b>)
              </span>
            </Link>
            {!session?.user ? (
              <Link
                href="/auth/signin"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300">
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            ) : (
              <Link href="/me">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <img
                    className="w-10 h-10 rounded-full"
                    //   src={"/images/default.png"}
                    src={
                      session?.user?.avatar
                        ? session?.user?.avatar.url
                        : "/images/default_product.svg"
                    }
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {session?.user?.name}
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {session?.user?.email}
                      </time>
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent">
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
