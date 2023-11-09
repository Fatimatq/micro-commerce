const mongoose = require("mongoose");

const Payment = new mongoose.Schema({
    idCommande: Number,
    montant: Number,
    numeroCarte: Number

})

module.exports = Payment;
