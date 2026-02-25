import bcrypt from "bcrypt";
import userModel from "../models/login.model.js";
import jwt from 'jsonwebtoken';

const jwt_secret = "lbn";

const checkLogin = async (req, res) => {
    const { role, email, password } = req.body;

    if(!role){
        return res.status(400).json({ errors: "Role is required" });
    }

    if(!email){
        return res.status(400).json({ errors: "Email is required" });
    }

    if(!password){
        return res.status(400).json({ errors: "Password is required" });
    }

    const userData = {role,email};
    userModel.checkLogin(userData, async (err, loginresult) => {
        if (err) {
            return res.status(400).json({ errors: err.message });
        }

        if (!loginresult || loginresult.length === 0) {
            return res.status(400).json({ errors: "Invalid Login" });
        }

        const user = loginresult[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: "Invalid login" });
        }

        const payload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600
        };

        const token = jwt.sign(payload, jwt_secret, { algorithm: "HS256" });

        return res.status(200).json({
            status: "success",
            message: "Login successfully",
            token,
            email
        });
    });
};

export { checkLogin };