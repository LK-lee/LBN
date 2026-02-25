import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTP(email, otp, userName = "User") {
  try {
    const mailOptions = {
      from: `"LBN Website" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your OTP for Account Verification - LBN Website",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f8fafc;
                    padding: 20px;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                }
                
                .email-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 40px 30px;
                    text-align: center;
                    color: white;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .logo-icon {
                    font-size: 32px;
                    background: rgba(255, 255, 255, 0.2);
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                }
                
                .logo-text {
                    font-size: 28px;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    letter-spacing: 1px;
                }
                
                .email-title {
                    font-size: 26px;
                    font-weight: 600;
                    margin-top: 15px;
                    font-family: 'Poppins', sans-serif;
                }
                
                .email-subtitle {
                    font-size: 16px;
                    opacity: 0.9;
                    margin-top: 8px;
                    font-weight: 300;
                }
                
                .email-content {
                    padding: 40px 35px;
                }
                
                .greeting {
                    font-size: 18px;
                    margin-bottom: 25px;
                    color: #444444;
                    font-weight: 500;
                }
                
                .message {
                    color: #555555;
                    margin-bottom: 30px;
                    font-size: 15px;
                }
                
                .otp-container {
                    background: linear-gradient(135deg, #f6f9ff 0%, #f0f4ff 100%);
                    border-radius: 12px;
                    padding: 35px 30px;
                    margin: 30px 0;
                    text-align: center;
                    border: 1px solid #e1e8ff;
                    position: relative;
                    overflow: hidden;
                }
                
                .otp-container:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 5px;
                    height: 100%;
                    background: linear-gradient(to bottom, #667eea, #764ba2);
                }
                
                .otp-label {
                    font-size: 16px;
                    color: #666666;
                    margin-bottom: 15px;
                    font-weight: 500;
                }
                
                .otp-code {
                    font-size: 48px;
                    font-weight: 700;
                    letter-spacing: 10px;
                    color: #667eea;
                    margin: 20px 0;
                    padding: 20px 0;
                    font-family: 'Poppins', monospace;
                    text-shadow: 0 2px 4px rgba(102, 126, 234, 0.1);
                    background: white;
                    border-radius: 10px;
                    display: inline-block;
                    padding: 20px 40px;
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.15);
                    border: 2px dashed rgba(102, 126, 234, 0.3);
                }
                
                .otp-expiry {
                    background: #fff5e6;
                    border-radius: 8px;
                    padding: 12px 20px;
                    margin-top: 20px;
                    display: inline-block;
                    font-size: 14px;
                    color: #e67e22;
                    font-weight: 600;
                }
                
                .warning-box {
                    background-color: #fff5f5;
                    border-radius: 10px;
                    padding: 25px;
                    margin: 30px 0;
                    border-left: 4px solid #fc8181;
                }
                
                .warning-title {
                    color: #c53030;
                    font-weight: 600;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 16px;
                }
                
                .warning-list {
                    padding-left: 20px;
                    margin-top: 10px;
                    color: #718096;
                }
                
                .warning-list li {
                    margin-bottom: 8px;
                }
                
                .help-section {
                    background-color: #f0f9ff;
                    border-radius: 10px;
                    padding: 25px;
                    margin: 25px 0;
                    border-left: 4px solid #63b3ed;
                }
                
                .help-title {
                    color: #2b6cb0;
                    font-weight: 600;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 16px;
                }
                
                .contact-info {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #e2e8f0;
                    color: #718096;
                    font-size: 14px;
                }
                
                .contact-info a {
                    color: #667eea;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .email-footer {
                    background-color: #1a202c;
                    padding: 30px 35px;
                    color: #cbd5e0;
                    text-align: center;
                    font-size: 14px;
                }
                
                .social-links {
                    margin: 20px 0;
                }
                
                .social-icon {
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    line-height: 36px;
                    margin: 0 8px;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s;
                }
                
                .social-icon:hover {
                    background: #667eea;
                    transform: translateY(-3px);
                }
                
                .footer-links {
                    margin: 20px 0;
                }
                
                .footer-links a {
                    color: #cbd5e0;
                    text-decoration: none;
                    margin: 0 12px;
                    font-size: 13px;
                    transition: color 0.3s;
                }
                
                .footer-links a:hover {
                    color: #667eea;
                }
                
                .copyright {
                    margin-top: 20px;
                    color: #a0aec0;
                    font-size: 13px;
                }
                
                @media only screen and (max-width: 600px) {
                    .email-content {
                        padding: 30px 20px;
                    }
                    
                    .email-header {
                        padding: 30px 20px;
                    }
                    
                    .otp-code {
                        font-size: 36px;
                        letter-spacing: 8px;
                        padding: 15px 25px;
                    }
                    
                    .email-footer {
                        padding: 25px 20px;
                    }
                }
                
                @media only screen and (max-width: 400px) {
                    .otp-code {
                        font-size: 32px;
                        letter-spacing: 6px;
                        padding: 12px 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- Header -->
                <div class="email-header">
                    <div class="logo">
                        <div class="logo-icon">🔐</div>
                        <div class="logo-text">LBN</div>
                    </div>
                    <h1 class="email-title">Account Verification</h1>
                    <p class="email-subtitle">Secure One-Time Password</p>
                </div>
                
                <!-- Content -->
                <div class="email-content">
                    <p class="greeting">Hello ${userName},</p>
                    
                    <p class="message">Welcome to <strong>LBN Website</strong>! To complete your account verification and ensure the security of your account, please use the One-Time Password (OTP) provided below.</p>
                    
                    <!-- OTP Section -->
                    <div class="otp-container">
                        <p class="otp-label">Your verification code is:</p>
                        <div class="otp-code">${otp}</div>
                        <div class="otp-expiry">⏰ This OTP expires in 1 minute</div>
                    </div>
                    
                    <p class="message">Enter this code in the verification page to complete your account setup. If you didn't request this code, please ignore this email.</p>
                    
                    <!-- Warning Section -->
                    <div class="warning-box">
                        <div class="warning-title">
                            <span>⚠️</span>
                            <span>Security Notice</span>
                        </div>
                        <ul class="warning-list">
                            <li>Never share this OTP with anyone, including LBN support team</li>
                            <li>This code is valid for one-time use only</li>
                        </ul>
                    </div>
                                        
                    <p class="message">Thank you for choosing LBN Website. We're excited to have you on board!</p>
                </div>
                
            </div>
        </body>
        </html>
            `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("sendOTP failed:", error);
    throw new Error("Email sending failed");
  }
}