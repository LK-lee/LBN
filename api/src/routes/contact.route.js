import {addcontacts, getcontacts, getcontactbyid, updatecontact, deletecontact, countofcontacts} from '../controllers/contact.controller.js';
import userValidator from '../validators/contact.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addcontact').post(userValidator, addcontacts);
router.route('/getcontacts').get(getcontacts);
router.route('/getcontactbyid/:id').get(getcontactbyid);
router.route('/updatecontact/:id').put(userValidator, updatecontact);
router.route('/deletecontact/:id').delete(deletecontact);
router.route('/countofcontacts').get(countofcontacts);

export default router;