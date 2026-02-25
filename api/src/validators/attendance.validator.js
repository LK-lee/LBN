import { body } from "express-validator";

const userValidator = [
    body("attendance_data").isArray({ min: 2 }).withMessage("attendance_data must be an array with at least 2 items"),
    body("attendance_data.*.meeting_id").optional().trim().notEmpty().withMessage("Meeting ID is required"),
    body("attendance_data.*.member_id").optional().trim().notEmpty().withMessage("Member ID is required"),
    body("attendance_data.*.status").optional().trim().notEmpty().withMessage("Status is required").isIn(['Present', 'Absent', 'Late', 'present', 'absent', 'late']).withMessage("Must be 'Present', 'Absent', or 'Late'"),
]

export default userValidator;