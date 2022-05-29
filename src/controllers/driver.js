const db = require("../models/models/index");

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
}

module.exports = Driver;
