const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("../Routes/userRouter");

require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/User", {
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the application on database connection error
});

db.once("open", function () {
    console.log("Database connected successfully");
});

app.use(express.json());
app.use("/users", userRouter);

const port = process.env.PORT || 5004;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
