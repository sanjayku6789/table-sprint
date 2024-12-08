const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['auth_token'];

    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }

    jwt.verify(token, "tablesprint_access_key", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.userId = decoded.id;
        next();
    });
};
