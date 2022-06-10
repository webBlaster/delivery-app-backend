const db = require("../models/models/index");
const client = require("../config");

class Customer {
  static async addOrder(req, res) {
    let data = req.body;
    const senderName = data?.senderName;
    const senderEmail = data?.senderEmail;
    const senderPhoneNumber = data?.senderPhoneNumber;
    const receiverName = data?.receiverName;
    const receiverEmail = data?.receiverEmail;
    const receiverPhoneNumber = data?.receiverPhoneNumber;
    const pickupAddress = data?.pickupAddress;
    const dropoffAddress = data?.dropoffAddress;
    const description = data?.description;
    const size = data?.size;
    const status = "pending";

    if (Object.keys(req.body).length < 10) {
      return res.status(400).send("parameters cant be left empty");
    }

    const order = await db.Order.create({
      sender_name: senderName,
      sender_email: senderEmail,
      sender_phonenumber: senderPhoneNumber,
      receiver_name: receiverName,
      receiver_email: receiverEmail,
      receiver_phonenumber: receiverPhoneNumber,
      pickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
      size,
      description,
      status,
    });

    if (order) {
      console.log(order);
      return res
        .status(201)
        .json({ data: order?.id, message: "order created" });
    }
    res.status(500).send("order was not created");
  }

  static async getCurrentLocation(req, res) {
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
  }
}

module.exports = Customer;
