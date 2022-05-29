const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controllers/index");
//middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("West delivery api version 1.0.0");
});

//customers
app.post("/create-order", controller.Customer.addOrder);

//drivers
app.get("/orders", controller.Driver.getOrders);
app.post("/order", controller.Driver.getOrder);
app.post("/decide-order", controller.Driver.decideOrder);
app.post("/complete-order", controller.Driver.completeOrder);

//admin

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
