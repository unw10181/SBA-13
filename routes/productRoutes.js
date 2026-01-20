const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

//index

router.get("/products", (req, res) => {
  res.send("How fa now");
});

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
            return res.status
        }
    }
})

module.exports = router;
