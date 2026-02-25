import { body } from "express-validator";

const userValidator = [
    body("meeting_id").trim().notEmpty().withMessage("Meeting ID is required"),
    body("given_by").trim().notEmpty().withMessage("thanks given by is required"),
    body("given_to").trim().notEmpty().withMessage("thanks given to is required"),
    body("amount").trim().notEmpty().withMessage("amount is required"),
    body("notes").trim().notEmpty().withMessage("thanks notes is required"),
]

export default userValidator;