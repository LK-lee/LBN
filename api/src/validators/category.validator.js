import { body } from "express-validator";

const userValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
]

export default userValidator;