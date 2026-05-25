//DEPENDENCIES
//Load environment variables
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//Import dependencies
const express = require("express");
const mongoDB = require("./config/connection");
const dbConnection = require("./config/connection");

//Create Express application
const app = express();

//Define PORT number
const PORT = process.env.PORT || 3000;

//MIDDLEWARE


//ROUTES
app.get("/test", (req,res) =>{
    res.send("testing TaskMaster API..");
});

//PORT / LISTEN
//Connect to MongoDB and start server
dbConnection().then(() => {
app.listen(PORT, () =>{
    console.log(`Server is listening on PORT ${PORT}`);
});
});

