const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const OrderSchema = new mongoose.Schema({
    productId: Number,
    orderDate: Date,
    quantity: Number,
    orderPay:Boolean
})
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
