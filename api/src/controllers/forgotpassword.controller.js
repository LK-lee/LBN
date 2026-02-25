import userModel from '../models/forgotpassword.model.js';
import { sendOTP } from '../utils/otp.js';
import bcrypt from "bcrypt";

const otpStore = {};

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const checkemail = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                status: "error",
                message: "Email is required" 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                status: "error",
                message: "Invalid email format" 
            });
        }

        const users = await userModel.checkemail({ email });

        if (!users || users.length === 0) {
            return res.status(404).json({ 
                status: "error",
                message: "No account found with this email" 
            });
        }

        const otp = generateOtp();
        const otpExpiry = Date.now() + 60000;
        
        otpStore[email] = {
            otp,
            expiry: otpExpiry,
            attempts: 0,
            createdAt: Date.now()
        };

        try {
            const userName = users[0]?.name || "User";
            await sendOTP(email, otp, userName);
            
            res.status(200).json({
                status: "success",
                message: "OTP sent successfully to your email",
                email,
                expiresIn: "1 minute"
            });
        } catch (mailError) {
            console.error("Failed to send OTP email:", mailError);
            delete otpStore[email]; 
            
            return res.status(500).json({
                status: "error",
                message: "Failed to send OTP. Please try again."
            });
        }
    } catch (error) {
        console.error("checkemail error:", error.message || error);
        return res.status(500).json({ 
            status: "error",
            message: "Internal server error" 
        });
    }
};

const verifyotp = async (req, res) => {
    try {
        const { email, enteredotp } = req.body;

        if (!email || !enteredotp) {
            return res.status(400).json({ 
                status: "error",
                message: "Email and OTP are required" 
            });
        }
        
        const otpData = otpStore[email];
        
        if (!otpData) {
            return res.status(400).json({ 
                status: "error",
                message: "OTP not found or expired. Please request a new OTP." 
            });
        }

        if (Date.now() > otpData.expiry) {
            delete otpStore[email];
            return res.status(400).json({ 
                status: "error",
                message: "OTP has expired. Please request a new OTP." 
            });
        }

        if (otpData.attempts >= 3) {
            delete otpStore[email]; 
            return res.status(400).json({ 
                status: "error",
                message: "Too many failed attempts. Please request a new OTP." 
            });
        }

        if (enteredotp !== otpData.otp) {
            otpData.attempts += 1;
            const remainingAttempts = 3 - otpData.attempts;
            
            return res.status(400).json({ 
                status: "error",
                message: `Invalid OTP. ${remainingAttempts} attempt(s) remaining.` 
            });
        }

        otpData.verified = true;
        otpData.verifiedAt = Date.now();

        const verificationId = Date.now().toString(36);

        res.status(200).json({
            status: "success",
            message: "OTP verified successfully",
            verificationId,
            email
        });
    } catch (error) {
        console.error("verifyotp error:", error.message || error);
        return res.status(500).json({ 
            status: "error",
            message: "Internal server error" 
        });
    }
};

const updatepassword = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword } = req.body;

        if (!email || !newpassword || !confirmpassword) {
            return res.status(400).json({ 
                status: "error",
                message: "All fields are required" 
            });
        }

        const otpData = otpStore[email];
        
        if (!otpData || !otpData.verified) {
            return res.status(400).json({ 
                status: "error",
                message: "Please verify OTP first." 
            });
        }

        const verificationAge = Date.now() - otpData.verifiedAt;
        if (verificationAge > 600000) { 
            delete otpStore[email];
            return res.status(400).json({ 
                status: "error",
                message: "Verification expired. Please restart the process." 
            });
        }

        if (newpassword !== confirmpassword) {
            return res.status(400).json({ 
                status: "error",
                message: "Passwords do not match" 
            });
        }

        if (newpassword.length < 5) {
            return res.status(400).json({ 
                status: "error",
                message: "Password must be at least 5 characters long" 
            });
        }

        const users = await userModel.checkemail({ email });

        if (!users || users.length === 0) {
            return res.status(404).json({ 
                status: "error",
                message: "User not found" 
            });
        }
        const saltRounds = 10;
                
        const hashedPassword = await bcrypt.hash(newpassword, saltRounds);
        const userData1 = { email, password: hashedPassword };
        await userModel.updatepassword(userData1);

        delete otpStore[email];

        res.status(200).json({
            status: "success",
            message: "Password updated successfully",
            email
        });
    } catch (error) {
        console.error("updatepassword error:", error.message || error);
        return res.status(500).json({ 
            status: "error",
            message: "Internal server error" 
        });
    }
};

function cleanupExpiredOTPs() {
    const now = Date.now();
    for (const email in otpStore) {
        if (otpStore[email].expiry < now) {
            delete otpStore[email];
        }
    }
}

setInterval(cleanupExpiredOTPs, 2 * 60 * 1000);

export { checkemail, verifyotp, updatepassword };