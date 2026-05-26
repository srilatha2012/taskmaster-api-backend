//DEPENDENCIES
//Load environment variables
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//Import dependencies
const express = require("express");
const mongoDB = require("./config/connection");
const User = require("./model/User");
const userRoutes = require("./routes/api/userRoutes");
const projectRoutes = require("./routes/api/projectRoutes");

//Create Express application
const app = express();

//Define PORT number
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", projectRoutes);

//ROUTES
app.get("/test", (req, res) => {
    res.send("testing TaskMaster API..");
});

//PORT / LISTEN
//Connect to MongoDB and start server
mongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`);
    });
});



