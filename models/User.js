import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const routineSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  products: { type: [ObjectId], required: [true, "Products is required"], ref: "Product" },
});

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  routines: { type: [routineSchema] },
});

export default model("User", userSchema);
