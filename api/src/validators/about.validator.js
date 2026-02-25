import { body } from "express-validator";

const userValidator = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("para1").trim().notEmpty().withMessage("Para1 is required"),
    body("para2").trim().notEmpty().withMessage("Para2 is required"),
]

export default userValidator;