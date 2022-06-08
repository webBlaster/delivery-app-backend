const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controllers/index");
const client = require("./config");

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
app.get("/validate-ip", controller.Driver.validateIp);

app.get("/get-current-location", function (req, res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  //pull most recent geocode form redis
  setInterval(async () => {
    try {
      let geocode = await client.get("Geocode");
      if (geocode) {
        console.log(geocode);
        res.write(`data:${JSON.stringify(geocode)}\n\n`);
      }
    } catch (error) {
      console.log(error);
    }
  }, 20000);
});

// //broadcast geolocation
// app.get("/get-current-location", (req, res) => {
//   const headers = {
//     "Content-Type": "text/event-stream",
//     // prettier-ignore
//     "Connection": "keep-alive",
//     "Cache-Control": "no-cache",
//   };
//   res.writeHead(200, headers);
//   const subscriberId = subscribers.length + 1;
//   subscribers.push({ id: subscriberId, res });

//   res.write(`connected`);
//   res.flush();

//   req.on("close", () => {
//     console.log(`${subscriberId} Connection closed`);
//     subscribers = subscribers.filter((sub) => sub.id !== subscriberId);
//   });
// });

app.post("/emit-current-location", (req, res) => {
  let { lat, lon } = req.body;
  let data = { lat, lon };

  //store geocode on redis
  //update geocode on redis
  try {
    client.set("Geocode", `${JSON.stringify(data)}`);
    res.status(200).send("geolocation sent");
  } catch (error) {
    console.log(error);
    res.status(500).send("failed to emit geolocation");
  }
});

//admin

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
