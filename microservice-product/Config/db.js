const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/microservice-product", {
    useUnifiedTopology: true,
});


const db = mongoose.connection;
app.use(cors());
db.on("error", console.error.bind(console, "Failed to connect to the database."));
db.once("open", function(){
    console.log("Database connected successfully");
});

// Importer les routes
const productRoutes = require("../Controllers/ProductController");

// Utiliser les routes
app.use("/", productRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
