const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    idCommande: String,
    montant: Number,
    numeroCarte: Number
});

// Ajoutez cette ligne pour permettre la recherche par identifiant
PaymentSchema.statics.findByIdCommande = function (idCommande) {
    return this.findOne({ idCommande });
};

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
