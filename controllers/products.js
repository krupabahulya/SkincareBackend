import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/product.js";

export const getAllProducts = asyncHandler(async (req, res, next) =>{
  console.log(req.query);
const products = await Product.find(req.query);
res.send(products)
});

export const getSingleProduct = asyncHandler(async (req, res, next) =>
  res.send("GET single")
);

export const createProduct = asyncHandler(async (req, res, next) =>
  res.send("POST")
);

export const updateProduct = asyncHandler(async (req, res, next) =>
  res.send("UPDATE")
);

export const deleteProduct = asyncHandler(async (req, res, next) =>
  res.send("DELETE")
);