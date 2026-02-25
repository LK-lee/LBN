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

export async function sendUserDetails(role,email,password) {
  try {
    const mailOptions = {
      from: `"LBN Website" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our LBN Website",
      html: `
        <h2>Welcome to Local Bussiness Network 🎉</h2>
        <p>Your account has been created successfully.</p>

        <div style="
          background-color:#f2f2f2;
          padding:15px;
          border-radius:6px;
          margin:15px 0;
          font-family: Arial, sans-serif;
        ">
          <p style="margin:5px 0;">
            <strong>Role:</strong> ${role}
          </p>  
          <p style="margin:5px 0;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="margin:5px 0;">
            <strong>Password:</strong> ${password}
          </p>
        </div>

        <p style="color:red; font-weight:600;">
          ⚠ Note:
        </p>
        <p>
          Please keep this information very confidential.
          Do not share your login credentials with anyone.
        </p>

        <br />
        <p>Thanks & Regards,<br/>LBN Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("sendUserDetails failed:", error);
    throw new Error("Email sending failed");
  }
}
