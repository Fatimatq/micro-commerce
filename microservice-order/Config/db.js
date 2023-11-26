const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/microservice-order", {
    useUnifiedTopology: true,
});
// mongoose.connect("mongodb://mcommerce-mongodb-replicaset-0.mcommerce-mongodb-service,mcommerce-mongodb-replicaset-1.mcommerce-mongodb-service,mcommerce-mongodb-replicaset-2.mcommerce-mongodb-service:27017/mcommerce-order?replicaSet=mongodb-replicaset", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const db = mongoose.connection;
app.use(cors());
db.on("error", console.error.bind(console, "Failed to connect to the database."));
db.once("open", function(){
    console.log("Database connected successfully");
});

// Importez les routes
const orderRoutes = require("../Controllers/OrderController");
app.use(express.json()); 

// Utilisez les routes
app.use("/", orderRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});