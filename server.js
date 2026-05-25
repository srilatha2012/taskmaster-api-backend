//DEPENDENCIES
//Load environment variables
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//Import dependencies
const express = require("express");

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
app.listen(PORT, () =>{
    console.log(`Server is listening on PORT ${PORT}`);
})
