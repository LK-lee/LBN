import { body } from "express-validator";

const userValidator = [
    body("first_name").trim().notEmpty().withMessage("First name is required"),
    body("last_name").trim().notEmpty().withMessage("Last name is required"),
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("trade").trim().notEmpty().withMessage("Trade is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
    body("mobile").trim().notEmpty().withMessage("Mobile is required"),
]

export default userValidator;