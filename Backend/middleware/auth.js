const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("Authorization");

    if(!token)
        return res.status(401).json({message: "No token, authorization denied"});

    try {
        const decode = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decode;
        next();

    }
    catch(err) {
        console.error("JWT Error:", err.message); 
        res.status(400).json({message: "Token is not valid"});
    }
}

module.exports = auth; 