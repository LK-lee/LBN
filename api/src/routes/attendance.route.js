import {addattendance, getattendances, getattendancebyid, updateattendance, deleteattendance} from '../controllers/attendance.controller.js';
import userValidator from '../validators/attendance.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addattendance').post(userValidator, addattendance);
router.route('/getattendances').get(getattendances);
router.route('/getattendancebyid/:id').get(getattendancebyid);
router.route('/updateattendance/:id').put(userValidator, updateattendance);
router.route('/deleteattendance/:id').delete(deleteattendance);

export default router;