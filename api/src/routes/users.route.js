import {addusers,getusers,getuserbyid,updateuser,deleteuser,checklogin,getuserbyemail,getapplog, verifyEmail, getEmailVerificationStatus,totalusers,deleteLogsByDate} from '../controllers/users.controller.js';
import userValidator from '../validators/users.validator.js';
import {upload} from "../middleware/multer.js";
import { Router } from 'express';

const router = Router();

router.route('/adduser').post(upload.fields([{ name: "profile_image", maxCount: 1 },{ name: "company_logo", maxCount: 1 }]),userValidator, addusers);
router.route('/getusers').get(getusers);
router.route('/getuserbyid/:id').get(getuserbyid);
router.route('/updateuser/:id').put(upload.fields([{ name: "profile_image", maxCount: 1 },{ name: "company_logo", maxCount: 1 }]),userValidator, updateuser);
router.route('/deleteuser/:id').delete(deleteuser);
router.route('/memberlogin').post(checklogin);
router.route('/getuserbyemail/:email').get(getuserbyemail);
router.route('/getapplog').get(getapplog);
router.route('/verifyemail').post(verifyEmail);
router.route('/email-verification-status').get(getEmailVerificationStatus); 
router.route('/totalusers').get(totalusers);
router.route('/deletelogsbydate').delete(deleteLogsByDate);

export default router;

// import {addusers,getusers,getuserbyid,updateuser,deleteuser,checklogin,getuserbyemail,getapplog} from '../controllers/users.controller.js';
// import userValidator from '../validators/users.validator.js';
// import {upload} from "../middleware/multer.js";
// import { Router } from 'express';

// const router = Router();

// router.route('/adduser').post(upload.fields([{ name: "profile_image", maxCount: 1 },{ name: "company_logo", maxCount: 1 }]),userValidator, addusers);
// router.route('/getusers').get(getusers);
// router.route('/getuserbyid/:id').get(getuserbyid);
// router.route('/updateuser/:id').put(upload.fields([{ name: "profile_image", maxCount: 1 },{ name: "company_logo", maxCount: 1 }]),userValidator, updateuser);
// router.route('/deleteuser/:id').delete(deleteuser);
// router.route('/memberlogin').post(checklogin);
// router.route('/getuserbyemail/:email').get(getuserbyemail);
// router.route('/getapplog').get(getapplog);

// export default router;