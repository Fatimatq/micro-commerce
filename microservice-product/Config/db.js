const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/microservice-product", {
    useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on("error", console.error.bind(console, "Failed to connect to the database."));
db.once("open", function(){
    console.log("Database connected successfully");
});

// Importez les routes
const productRoutes = require("../Controllers/ProductController");

// Utilisez les routes
app.use("/", productRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
