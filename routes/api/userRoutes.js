const userRouter = require("express").Router();
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const {signToken} = require("../../utils/auth");

//User registration
userRouter.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log("got the user details", user);
        res.status(201).json({
            message: "User registered Successfully",
            user,
        })
    } catch (error) {
        res.status(400).json({
            message: "Registration Failed",
            error: error.message
        })
    }

});

//user login - return token 
userRouter.post("/login", async (req, res) => {
    try {
        
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or Password" });
        }
        console.log("before");
        const correctPWD = await user.isCorrectPassword(password);
        if (!correctPWD) {
            return res.status(401).json({ message: "Wrong password" });
        }
        const token = signToken(user);
        console.log(token);
        res.json({ token, user });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
});

module.exports = userRouter;