const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

// Connexion à la base de données
mongoose.connect("mongodb://127.0.0.1:27017/microservice-payment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors());
const db = mongoose.connection;

// Gestion des événements de la connexion à la base de données
db.on("error", console.error.bind(console, "Failed to connect to the database."));
db.once("open", function(){
    console.log("Database connected successfully");
});

// Importer les routes
const paiementRoutes = require("../Controllers/PaiementController");

// Utiliser les routes
app.use(express.json());
app.use("/", paiementRoutes);

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
