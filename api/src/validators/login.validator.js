import { body } from "express-validator";

const userValidator = [
    body("role").trim().notEmpty().withMessage("Role is required"),
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
]

export default userValidator;