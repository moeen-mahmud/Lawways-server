// Necessary modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Testing endpoint
app.get("/", (req, res) => {
  res.send("Service Website Is Running 🔥");
});

app.listen(port, () => {
  console.log("Server is running at port", port);
});
