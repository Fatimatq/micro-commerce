const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/microservice-payment"),{
    useNewUrlParser : true,
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Failed to connect to the database."));
db.once("open", function(){
    console.log("Database connected successfully");
});
