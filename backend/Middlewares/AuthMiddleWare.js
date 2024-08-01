const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);

        // Attach user info to the request
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;