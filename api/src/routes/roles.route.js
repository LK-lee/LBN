import {addrole, getroles, getrolebyid, updaterole, deleterole} from '../controllers/roles.controller.js';
import userValidator from '../validators/roles.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addrole').post(userValidator, addrole);
router.route('/getroles').get(getroles);
router.route('/getrolebyid/:id').get(getrolebyid);
router.route('/updaterole/:id').put(userValidator, updaterole);
router.route('/deleterole/:id').delete(deleterole);

export default router;