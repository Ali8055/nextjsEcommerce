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
      state.cart.push(action.payload);
      console.log("actioncart", action.payload);
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

export const selectCartItems = cartSlice.cart;
export const { addCartItems } = cartSlice.actions;

export default cartSlice.reducer;
