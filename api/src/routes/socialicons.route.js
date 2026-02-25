import {addsocialicon, getsocialicons, getsocialiconbyid, updatesocialicon, deletesocialicon} from '../controllers/socialicons.controller.js';
import userValidator from '../validators/socialicons.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addsocialicon').post(userValidator, addsocialicon);
router.route('/getsocialicons').get(getsocialicons);
router.route('/getsocialiconbyid/:id').get(getsocialiconbyid);
router.route('/updatesocialicon/:id').put(userValidator, updatesocialicon);
router.route('/deletesocialicon/:id').delete(deletesocialicon);

export default router;