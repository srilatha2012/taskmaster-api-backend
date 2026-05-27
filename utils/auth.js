const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiration = "2h";


/*
JWT Authentication
It does 2 jobs
1. signToken -> create JWT token after login/signup
2. authMiddleware -> verify token before allowing protected routes
*/
module.exports = {
    authMiddleware: function (req, res, next) {
        let token = req.body?.token || req.query?.token || req.headers.authorization;
        // console.log("token",token);
        if (req.headers.authorization) {
            console.log("authorization",token);
            token = token.split(' ').pop().trim();
        }
        if (!token) {
            res.status(401).json({ message: "You must be logged in to do that" });
        }
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            console.log("data==>", data);
            req.user = data;
            console.log("userxxxxxxxxxxxxxxxxxx",req.user._id);
        } catch (error) {
            console.log("invalid token", error.message);
            return res.status(401).json({
                message: "Invalid token",
                error: error.message
            })
        }
        next();
    },

    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}
