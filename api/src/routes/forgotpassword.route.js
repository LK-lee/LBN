import {checkemail, verifyotp, updatepassword} from '../controllers/forgotpassword.controller.js';
import { Router } from 'express';

const router = Router();

router.route('/forgotpassword').post(checkemail);
router.route('/verifyotp').post(verifyotp);
router.route('/resetpassword').put(updatepassword);

export default router;