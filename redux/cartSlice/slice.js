import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  status: null,
  cart: [],
};

// export const add = createAsyncThunk(
//   "cart/add",
//   async (args, { rejectWithValue }) => {
//     try {
//       console.log("abc", args);
//       return args;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      //yaha ek filter lagyga agar already exist karta hy to uska count brhana hoga

      const itemIndex = state.cart.findIndex(
        (i) => i.product == action.payload.product
      );
      if (itemIndex !== -1) {
          state.cart[itemIndex].quantity = ++state.cart[itemIndex].quantity;
        console.log("Updated cart state:");
      } else {
        console.log("Item not found in cart:");
        let item = action.payload;
        item.quantity = 1;
        state.cart.push(item);
      }
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      console.log("productId, quantity", productId, quantity);

      const itemIndex = state.cart.findIndex((i) => i.product == productId);
      if (itemIndex !== -1) {
        if (quantity > 0) {
          state.cart[itemIndex].quantity = quantity;
        } else {
          state.cart.splice(itemIndex, 1);
        }
        console.log("Updated cart state:", state.cart);
      } else {
        console.log("Item not found in cart:", productId);
      }
    },
    RemoveItemFromCart: (state, action) => {
      const { productId } = action.payload;

      const itemIndex = state.cart.findIndex((i) => i.product == productId);
   
          state.cart.splice(itemIndex, 1);
   
    },
  },

  extraReducers: (builder) => {
    builder;
    // .addCase(add.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(add.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.cart.push(action.payload);
    // })
    // .addCase(add.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const selectCartItems = (state) => state.cart.cart;
export const { addCartItems, updateItemQuantity,RemoveItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
