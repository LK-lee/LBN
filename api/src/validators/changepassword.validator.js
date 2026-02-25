import { body } from "express-validator";

const userValidator = [
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("oldpassword").trim().notEmpty().withMessage("Old password is required"),
    body("newpassword").trim().notEmpty().withMessage("New password is required"),
    body("confirmpassword").trim().notEmpty().withMessage("Confirm password is required")
]

export default userValidator;