const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Create
router.post("/products", (req, res) => {
  console.log(req.body);
  Product.create(req.body)
    .then((createdProduct) => {
      console.log("Product Created.", createdProduct);
      res.redirect("/products");
    })
    .catch((error) => {
      console.error("Error creating Book", error);
      res.status(500).send("Error creating Book");
    });
});

//GET By ID

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Put
router.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).exec();
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete, update by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    console.log(deletedProduct);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(501).send(error);
  }
});

//index GET ALL

router.get("/products", async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Filtering
    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = {};
    if (sortBy === "price_asc") {
      sortOption.price = 1;
    } else if (sortBy === "price_desc") {
      sortOption.price = -1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
