const express = require("express");
const router = express.Router();
const Product = require("../Models/ProductModel"); 

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({}).exec();
        res.json(products);
    } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        res.status(500).send("Erreur lors de la récupération des produits.");
    }
});



router.get("/products/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).exec();
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.json(product); 
    } catch (err) {
        console.error("Erreur lors de la récupération du produit :", err);
        res.status(500).send("Erreur lors de la récupération du produit.");
    }
});

module.exports = router;
