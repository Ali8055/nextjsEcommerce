import React from "react";

function Cart() {
  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {/* {cart?.cartItems?.length || 0} Item(s) in Cart */}2 Item(s) in
            Cart
          </h2>
        </div>
      </section>
    </>
  );
}

export default Cart;
