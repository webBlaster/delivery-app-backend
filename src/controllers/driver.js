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

  static async decideOrder(req, res) {}
}

module.exports = Driver;
