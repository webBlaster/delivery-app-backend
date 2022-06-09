const db = require("../models/models/index");
const client = require("../config");

class Driver {
  static async getOrders(req, res) {
    const orders = await db.Order.findAll();

    if (orders) {
      return res.status(200).json({ data: orders, message: "fetched orders" });
    }
    res.status(500).send("failed to fetch orders");
  }

  static async getOrder(req, res) {
    const id = req.body?.id;
    if (!id) return res.status(400).send("id is empty");
    const order = await db.Order.findOne({ where: { id } });
    if (order) {
      return res.status(200).json({ data: order, message: "fetched order" });
    }
    return res.status(500).send("failed to fetch order");
  }

  static async decideOrder(req, res) {
    const id = req.body?.id;
    const accept = req.body?.accept;

    if (Object.keys(req.body).length < 2) {
      return res.status(400).send("parameters cant be left empty");
    }

    //find order from id
    order = await findOne({ where: { id: id } });
    //change order status
    if (order) {
      order.status = accept ? "in_progress" : "declined";
      await user.save();
      res.status(200).send(`${accept ? "accepted" : "declined"} order`);
      return;
    }
    return res.status(500).send("failed to decide");
  }

  static async completeOrder(req, res) {
    const id = req.body?.id;

    if (!id) {
      return res.status(400).send("parameters cant be left empty");
    }

    //find order from id
    order = await findOne({ where: { id: id } });
    //update order status
    if (order) {
      order.status = "completed";
      await user.save();
      res.status(200).send("updated order to complete order");
      return;
    }
    return res.status(500).send("failed to update to complete");
  }

  static async validateIp(req, res) {
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let ipSplits = ip.split(".");
    let ipSlice = `${ipSplits[0]}.${ipSplits[1]}`;
    let ipSliceArray = ["105.112", "102.89"];
    if (ipSliceArray.includes(ipSlice)) {
      return res
        .status(200)
        .json({ data: ip, message: "your ip address is valid" });
    }
    return res
      .status(400)
      .json({ data: ip, message: "your ip address is invalid" });
  }

  static emitCurrentLocation(req, res) {
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
  }
}

module.exports = Driver;
