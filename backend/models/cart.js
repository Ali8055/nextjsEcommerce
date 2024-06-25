import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
