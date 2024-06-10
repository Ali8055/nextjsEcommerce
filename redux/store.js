import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};
