import {addleaders,getcoreleaders,getleaderbyid,updateleaders,deleteleader,getmemberstoaddcoreleaders,getdesignationstoaddcoreleaders} from '../controllers/coreleaders.controller.js';
import userValidator from '../validators/coreleaders.validator.js'
import { Router } from 'express';

const router = Router();

router.route('/addcoreleader').post(userValidator, addleaders);
router.route('/getcoreleaders').get(getcoreleaders);
router.route('/getcoreleaderbyid/:id').get(getleaderbyid);
router.route('/updatecoreleaders').put(userValidator, updateleaders);
router.route('/deletecoreleader/:id').delete(deleteleader);
router.route('/getmemberstoaddcoreleaders').get(getmemberstoaddcoreleaders);
router.route('/getdesignationstoaddcoreleaders').get(getdesignationstoaddcoreleaders);

export default router;