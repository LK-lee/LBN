import { body } from "express-validator";

const userValidator = [
    body("icon_name").trim().notEmpty().withMessage("Icon name is required"),
    body("link").trim().notEmpty().withMessage("Link is required"),
]

export default userValidator;