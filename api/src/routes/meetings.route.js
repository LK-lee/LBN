import {addmeetings, getmeetings, getmeetingbyid, updatemeeting, deletemeeting, countofmeetings,getmembersattendance,getmeetingid} from '../controllers/meetings.controller.js';
import userValidator from '../validators/meetings.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addmeeting').post(userValidator, addmeetings);
router.route('/getmeetings').get(getmeetings);
router.route('/getmeetingbyid/:id').get(getmeetingbyid);
router.route('/updatemeeting/:id').put(userValidator, updatemeeting);
router.route('/deletemeeting/:id').delete(deletemeeting);
router.route('/countofmeetings').get(countofmeetings);
router.route('/getmembersattendance/:id').get(getmembersattendance);
router.route('/getmeetingid').get(getmeetingid);

export default router;