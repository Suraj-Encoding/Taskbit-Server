const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const SECRET = "idhiadhkladkndkan980e7070270928093uhlwndkndknakdnad";

const auth = async (req, res, next) => {
    let authorization = req.headers.authorization;

    if (authorization === null | authorization === undefined) {
        return res.status(403).json({ error: "Token not found" });
    }

    try {
        let token = authorization.substring(7,);
        const email = jwt.verify(token, SECRET);
        const user = await User.findOne({ email: email });
        if (user === null) {
            return res.status(403).json({ error: "Token is not valid" });
        }
        res.locals.user = user;

        return next();
    } catch (error) {
        return res.status(500).json({ error: "Token is not valid." });
    }

}

module.exports = auth;