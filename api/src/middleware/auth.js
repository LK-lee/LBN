import jwt from "jsonwebtoken";

const jwt_secret = "lbnwebsite";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ errors: "Token required" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ errors: "Invalid token format" });
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ errors: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};

export default verifyToken;
