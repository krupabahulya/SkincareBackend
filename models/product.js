import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  imageURL: { type: String, required: true },
  URL: { type: String, required: true },
  category: { type: String, required: true },
  treatment: String,
  recommendedFor: { type: [String], required: true },
  ingredients: { type: [String], required: true },
});

export default mongoose.model("Product", productSchema);
