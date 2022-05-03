import Product from "../models/product.js";
import express from "express";

const router = express.Router();

// Get a list of all the products

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    const products = await Product.find(req.query);
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Create a new product

router.post("/", async (req, res) => {
  const { name, brand, imageURL, URL, category, recommendedFor, ingredients } =
    req.body;

  let product = new Product({
    name,
    brand,
    imageURL,
    URL,
    category,
    recommendedFor,
    ingredients,
  });

  try {
    product = await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }

});

// Update a product by ID

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send("Product not found...");

    const {
      name,
      brand,
      imageURL,
      URL,
      category,
      recommendedFor,
      ingredients,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        brand,
        imageURL,
        URL,
        category,
        recommendedFor,
        ingredients,
      },
      { new: true }
    );

    res.send(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Delete a Product by ID

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send("Product not found...");

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

export default router;
