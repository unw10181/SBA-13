const express = require("express");
const Product = require("../models/Product")

const router = express.Router();

// Create 
app.post("/products", (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Product.create(req.body)
    .then((createdProduct) => {
        console.log("Product Created.", createdProduct)
    })
    .catch((error) => {
        console.error("Error creating Book", error)
        res.status(500).send("Error creating Book")
    })
})


