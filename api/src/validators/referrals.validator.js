import { body } from "express-validator";

const userValidator = [
    body("referred_by").trim().notEmpty().withMessage("referred_by is required"),
    body("name").trim().notEmpty().withMessage("name is required"),
    body("meeting_id").trim().notEmpty().withMessage("meeting_id is required"),
    body("mobile").trim().notEmpty().withMessage("mobile is required"),
    body("status").trim().notEmpty().withMessage("Status is required").isIn(['invited','joined','not_interested']).withMessage("Must be in invited, joined, not_interested"),
]

export default userValidator;