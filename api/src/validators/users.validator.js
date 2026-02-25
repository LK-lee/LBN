import { body } from "express-validator";

const userValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("mobile").trim().notEmpty().withMessage("Mobile is required"),
    body("role").trim().notEmpty().withMessage("Role is required").isIn(['admin','member']).withMessage("Must be in admin or member"),
    body("status").trim().notEmpty().withMessage("Status is required").isIn(['active','inactive']).withMessage("Must be in active or inactive"),
    body("dob").trim().notEmpty().withMessage("Date of birth is required"),
    body("trade_category").trim().notEmpty().withMessage("Trade category is required"),
    body("company_name").trim().notEmpty().withMessage("Company name is required"),
    body("join_date").trim().notEmpty().withMessage("Join date is required"),
    body("address").trim().notEmpty().withMessage("Address is required"),
    body("instagram_link").optional().trim().notEmpty().withMessage("Instagram link is required"),
    body("linkedin_link").optional().trim().notEmpty().withMessage("Linkedin link is required"),
    body("whatsapp_link").optional().trim().notEmpty().withMessage("Whatsapp link is required"),
]

export default userValidator;