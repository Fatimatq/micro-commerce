const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Paiement = require("../Models/PaymentModel");

router.post("/payments", async (req, res) => {
    const paiementData = req.body;

    try {
        const existingPaiement = await Paiement.findByIdCommande(paiementData.idCommande);

        if (existingPaiement) {
            return res.status(409).json({ error: "Cette commande est déjà payée" });
        }

        const newPaiement = await Paiement.create(paiementData);

        if (!newPaiement) {
            return res.status(500).json({
                error: "Erreur, impossible d'établir le paiement, réessayez plus tard",
            });
        }

        console.log(newPaiement);

        const commandeResponse = await axios.get(
            `http://localhost:5001/orders/${newPaiement.idCommande}`
        );
        const commandData = commandeResponse.data;

        if (!commandData) {
            return res
                .status(404)
                .json({ error: "La commande correspondante n'a pas été trouvée" });
        }

        // Mettez à jour la commande pour la marquer comme payée
        commandData.commandePayee = true;

        const updateCommandeResponse = await axios.put(
            `http://localhost:5001/orders/${newPaiement.idCommande}`,
            commandData
        );

        if (updateCommandeResponse.status !== 200) {
            return res
                .status(500)
                .json({ error: "Erreur lors de la mise à jour de la commande" });
        }

        return res.status(201).json(newPaiement);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Une erreur est survenue lors du paiement" });
    }
});

module.exports = router;
