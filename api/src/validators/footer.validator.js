import { body } from "express-validator";

const userValidator = [
    body("address").trim().notEmpty().withMessage("Address is required"),
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("number").trim().notEmpty().withMessage("Number is required"),
    body("map").trim().notEmpty().withMessage("Map is required"),
]

export default userValidator;