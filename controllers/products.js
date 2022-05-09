import Product from "../models/product.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Get a list of all the products

export const getAllProducts = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  const products = await Product.find(req.query).populate("ingredients");
  res.json(products);
});

// Get product by id

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("ingredients");
  if (!product)
    throw new ErrorResponse(`Product with id of ${id} doesn't exist`, 404);
  res.json({
    data: product,
  });
});

export const getProductByQuery = asyncHandler(async (req, res) => {
  try {
    const {
      query: { recommendedFor, category, name, brand },
    } = req;
    let query = {};
    if (recommendedFor) {
      query.recommendedFor =
        recommendedFor.charAt(0).toUpperCase() +
        recommendedFor.slice(1).toLowerCase();
    }
    if (category) {
      query.category = category
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    if (name) {
      query.name = name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    if (brand) {
      query.brand = brand
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    console.log(query);
    const products = await Product.find(query).populate("ingredients");
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Create a new product

export const createProduct = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const newProduct = await Product.create(body);
  res.status(201).json(newProduct);
});

// Update a product by ID

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const updatedProduct = await Product.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!updatedProduct)
    throw new ErrorResponse(`Product with id of ${id} doesn't exist`, 404);
  res.json(updatedProduct);
});

// Delete a Product by ID

export const deleteProduct = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted)
    throw new ErrorResponse(`Product with id of ${id} doesn't exist`, 404);
  res.json({ success: `Product with id of ${id} was deleted` });
});
