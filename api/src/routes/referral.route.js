import {addReferral,getReferral,getReferralbyid,updateReferral,deleteReferral} from '../controllers/referrals.controller.js';
import userValidator from '../validators/referrals.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addreferrals').post(userValidator, addReferral);
router.route('/getreferrals').get(getReferral);
router.route('/getreferralbyid/:id').get(getReferralbyid);
router.route('/updatereferral/:id').put(userValidator, updateReferral);
router.route('/deletereferral/:id').delete(deleteReferral);


export default router;