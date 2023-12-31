const express = require("express");
const router = express.Router();
const Order = require("../Models/OrderModule"); 

router.post("/orders", async (req, res) => {
    const { productId, orderDate, quantity, orderPay } = req.body;
    try {
        const newOrder = await Order.create({
            productId,
            orderDate,
            quantity,
            orderPay
        });
        console.log("Commande créée avec succès");
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Erreur lors de l'ajout de la commande :", err);
        res.status(500).send("Erreur lors de l'ajout de cette commande.");
    }
});



router.get("/orders/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        console.log(orderId);
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Commande non trouvé" });
        }
        res.json(order); 
    } catch (err) {
        console.error("Erreur lors de la récupération du commande :", err);
        res.status(500).send("Erreur lors de la récupération du commande.");
    }
});

router.put("/orders/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const { productId, orderDate, quantity, orderPay } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { productId, orderDate, quantity, orderPay },
            { new: true } // Pour renvoyer la version mise à jour de l'objet
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        console.log("Commande mise à jour avec succès");
        res.json(updatedOrder);
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la commande :", err);
        res.status(500).send("Erreur lors de la mise à jour de la commande.");
    }
});


module.exports = router;