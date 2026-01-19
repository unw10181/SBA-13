// Dependencies
const express = require("express");
const app = express();
require("dotenv").config();

const dbConnection = require("./config/connection");

// Middleware
app.use(express.urlencoded({ extended: true }));

//DB Connection
dbConnection();

// INDUCES

//Port - Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Sever is listening on port: ${PORT}`);
});
