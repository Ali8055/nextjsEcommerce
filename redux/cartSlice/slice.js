import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  status: null,
    cart:[],
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


      //action.payload ko open karygy
      console.log();
      let item = action.payload;
      item.quantity = 1;

      // const isItemExist = state.cart.find((i)=>i.item===item.product)


      // state.cart.map((itteratedItem)=>{
      //   console.log(itteratedItem,"itteratedItem");
      //   return itteratedItem.product === isItemExist.product ?itteratedItem.quantity+=1:itteratedItem;
      // })
      state.cart.push(item);
      console.log(item,"actioncart", action.payload);
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      console.log("productId, quantity",productId, quantity);

      const arrayOfItems = state.cart;
      const itemIndex = state.cart.findIndex((i) => i.productId == productId);
      if (itemIndex !== -1) {
        if (quantity > 0) {
          arrayOfItems[itemIndex].quantity = quantity;
        } else {
          arrayOfItems.splice(itemIndex, 1);
        }
        console.log("Updated cart state:", state.cart);
      } else {
        console.log("Item not found in cart:", productId);
      }
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

export const selectCartItems = (state)=>state.cart.cart;
export const { addCartItems,updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
