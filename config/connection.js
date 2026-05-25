const mongoose = require("mongoose");

//Get MongoDB connection string from .env file
const MONGO_URI=process.env.MONGO_URI;

//Function to connect the application to MongoDB
async function dbConnection() {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB")
}

module.exports = dbConnection;