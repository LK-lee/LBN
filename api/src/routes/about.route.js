import {addabout,getabout,getaboutbyid,updateabout,deleteabout} from '../controllers/about.controller.js';
import userValidator from '../validators/about.validator.js';
import {upload} from '../middleware/multer.js';
import { Router } from 'express';

const router = Router();

router.route('/addabout').post(upload.single("image"),userValidator, addabout);
router.route('/getabout').get(getabout);
router.route('/getaboutbyid/:id').get(getaboutbyid);
router.route('/updateabout/:id').put(upload.single("image"),userValidator, updateabout);
router.route('/deleteabout/:id').delete(deleteabout);

export default router;