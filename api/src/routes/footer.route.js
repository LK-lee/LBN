import {addfooter, getfooters, getfooterbyid, updatefooter, deletefooter} from '../controllers/footer.controller.js';
import userValidator from '../validators/footer.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addfooter').post(userValidator, addfooter);
router.route('/getfooters').get(getfooters);
router.route('/getfooterbyid/:id').get(getfooterbyid);
router.route('/updatefooter/:id').put(userValidator, updatefooter);
router.route('/deletefooter/:id').delete(deletefooter);

export default router;