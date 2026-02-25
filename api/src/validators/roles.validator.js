import { body } from "express-validator";

const userValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
]

export default userValidator;