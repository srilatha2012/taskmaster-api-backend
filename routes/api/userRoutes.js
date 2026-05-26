const userRouter = require("express").Router();
const User = require("../../model/User");

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

module.exports = userRouter;