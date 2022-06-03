const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controllers/index");
const { response } = require("express");
//middleware
app.use(cors());
app.use(express.json());

//event subscribers
let subscribers = [];

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
app.get("/validate-ip", controller.Driver.validateIp);

//broadcast geolocation
app.get("/get-current-location", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
  const subscriberId = subscribers.length + 1;
  subscribers.push({ id: subscriberId, res });
  res.write(`connected`);

  req.on("close", () => {
    console.log(`${subscriberId} Connection closed`);
    subscribers = subscribers.filter((sub) => sub.id !== subscriberId);
  });
});

app.post("/emit-current-location", (req, res) => {
  let { lat, long } = req.body;
  let data = { lat, long };
  subscribers.forEach((subscriber) =>
    subscriber.res.write(`geolocation: ${JSON.stringify(data)}\n\n`)
  );
  res.status(200).send("geolocation sent");
});

//admin

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
