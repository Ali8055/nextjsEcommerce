"use client";
import Shipping from "@/components/cart/Shipping";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL // Use an environment variable for the base URL on the server
    : "";

function shipping() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

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
    <div>
      <Shipping addresses={addresses.allAddresses} />
    </div>
  );
}

export default shipping;
