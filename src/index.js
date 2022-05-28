const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("West delivery api version 1.0.0");
});

//customers
/**
 * send order
 */
app.post("/create-order", (req, res) => {});
//drivers
/**
 * get orders
 * get order
 * decline/accept order
 */
app.get("/orders", (req, res) => {});
app.get("/order", (req, res) => {});
app.post("/decide-order", (req, res) => {});
//admin

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
