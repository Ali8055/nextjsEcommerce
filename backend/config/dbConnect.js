import mongoose from "mongoose";

const dbConnect = async () => {
  console.log("db connected");
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.DB_URI);
};

export default dbConnect;
