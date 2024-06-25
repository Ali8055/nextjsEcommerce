"use client";
import React, { useRef } from "react";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, selectCartItems } from "@/redux/cartSlice/slice";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

function ProductDetailsPage({ product }) {
  const cartDetails = useSelector(selectCartItems);
  const { data: session, status } = useSession();
  console.log("session data", session?.user._id, status);
  const inStock = product?.stock >= 1;

  const imgRef = useRef(null);
  function setImage(url) {
    imgRef.current.src = url;
  }

  const dispatch = useDispatch();

  const handleCart = async (e) => {
    e.preventDefault();
    dispatch(
      addCartItems({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product?.images[0].url,
        stock: product.stock,
        seller: product.seller,
      })
    );
    // setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartDetails, userId: session?.user._id }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.status == false) {
        toast.error(data.message);
      } else {
        toast.success("Added to cart!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  console.log("check image", cartDetails);
  return (
    <div className="container max-w-screen-xl mx-auto px-4">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
        <aside>
          <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
            <Image
              ref={imgRef}
              className="object-cover inline-block"
              src={
                product?.images[0]
                  ? product?.images[0].url
                  : "/images/default_product.svg"
              }
              alt="Product title"
              width="340"
              height="340"
            />
          </div>
          <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
            {product?.images?.map((img, index) => (
              <a
                key={img.url}
                onClick={() => setImage(img?.url)}
                className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer">
                <Image
                  className="w-14 h-14"
                  src={img.url}
                  alt="Product title"
                  width="500"
                  height="500"
                />
              </a>
            ))}
          </div>
        </aside>
        <main>
          <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

          <div className="flex flex-wrap items-center space-x-2 mb-2">
            <div className="ratings">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="#ffb829"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
                name="rating"
              />
            </div>
            <span className="text-yellow-500">{product?.ratings}</span>

            <svg
              width="6px"
              height="6px"
              viewBox="0 0 6 6"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
            </svg>

            <span className="text-green-500">Verified</span>
          </div>

          <p className="mb-4 font-semibold text-xl">${product?.price}</p>

          <p className="mb-4 text-gray-500">{product?.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={handleCart}
              className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              <i className="fa fa-shopping-cart mr-2"></i>
              Add to cart
            </button>
          </div>

          <ul className="mb-5">
            <li className="mb-1">
              {" "}
              <b className="font-medium w-36 inline-block">Stock</b>
              {inStock ? (
                <span className="text-gray-500">In Stock</span>
              ) : (
                <span className="text-gray-500">Out of Stock</span>
              )}
            </li>
            <li className="mb-1">
              {" "}
              <b className="font-medium w-36 inline-block">Category:</b>
              <span className="text-gray-500">{product?.category}</span>
            </li>
            <li className="mb-1">
              {" "}
              <b className="font-medium w-36 inline-block">Seller / Brand:</b>
              <span className="text-gray-500">{product?.seller}</span>
            </li>
          </ul>
        </main>
      </div>

      {/* <NewReview /> */}
      <hr />

      <div className="font-semibold">
        <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
          Other Customers Reviews
        </h1>
        {/* <Reviews /> */}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
