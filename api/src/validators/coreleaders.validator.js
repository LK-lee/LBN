import { body } from "express-validator";

const userValidator = [
    body("*.member_id").notEmpty().withMessage("Member ID required"),
    body("*.designation").notEmpty().withMessage("Designation required"),
    body("*.status").isIn(["1","0"]).withMessage("Status must be 1 or 0")
];

export default userValidator;
