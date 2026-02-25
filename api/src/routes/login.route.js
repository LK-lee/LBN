import {checkLogin} from '../controllers/login.controller.js';
import userValidator from '../validators/login.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/login').post(userValidator, checkLogin);

export default router;