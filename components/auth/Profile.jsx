"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAddresses from "../user/UserAddress";

const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL // Use an environment variable for the base URL on the server
    : "";

const Profile = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const formatDate = new Date(session?.user?.createdAt).toLocaleDateString(
    undefined
  );

  useEffect(() => {
    const fetchAllAddresses = async () => {
      if (!session?.user?._id) return;
      try {
        const response = await fetch(
          `${baseUrl}/api/address?userId=${session?.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchAllAddresses();
    }
  }, [session]);

  console.log("abcccc", addresses);

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={
              session?.user?.avatar
                ? session?.user?.url
                : "/images/profile.jpeg"
            }
            alt={session?.user?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg capitalize">
            {session?.user?.name}
          </h5>
          <p>
            <b>Email:</b> {session?.user?.email} | <b>Joined On:</b>&nbsp;
            {formatDate}
            {/* {session?.user?.createdAt.substring(0, 10)} */}
          </p>
        </figcaption>
      </figure>
      <hr className="my-4" />
      {loading ? (
        "Loading...."
      ) : (
        <UserAddresses addresses={addresses.allAddresses} />
      )}

      <Link href="/me/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>
      <hr className="my-4" />
    </>
  );
};

export default Profile;
