import { changepassword } from "../controllers/changepassword.controller.js";
import userValidator from "../validators/changepassword.validator.js";
import verifyToken from "../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.route('/changepassword').put(verifyToken, userValidator, changepassword);

export default router;