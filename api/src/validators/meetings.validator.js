import { body } from "express-validator";

const userValidator = [
    body("meeting_title").trim().notEmpty().withMessage("Meeting title is required"),
    body("meeting_date").trim().notEmpty().withMessage("Meeting date is required"),
    body("meeting_type").trim().notEmpty().withMessage("Meeting type is required").isIn(['Monthly','Special']).withMessage("Must be in monthly or special"),
    body("meeting_time").trim().notEmpty().withMessage("Meeting Time is required"),
    body("meeting_mode").trim().notEmpty().withMessage("Meeting mode is required").isIn(['Offline','Online']).withMessage("Must be in offline or online"),
    body("meeting_place").trim().notEmpty().withMessage("Meeting place is required"),
    body("status").trim().notEmpty().withMessage("Status is required").isIn(['Opened','Closed']).withMessage("Must be in open or closed"),
]

export default userValidator;