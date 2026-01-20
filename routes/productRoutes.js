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
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: error.message });
  }
});

// Delete, update by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (error) {
    res.status(501).send(error);
  }
});

//index GET ALL


router.get("/products", async (req, res) => {
  try {

  } catch (err) {
    
  }
});

module.exports = router;
