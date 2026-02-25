import {addcategory, getcategory, getcategorybyid, updatecategory, deletecategory,getallcategories} from '../controllers/category.controller.js';
import userValidator from '../validators/category.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addcategory').post(userValidator, addcategory);
router.route('/getcategory').get(getcategory);
router.route('/getcategorybyid/:id').get(getcategorybyid);
router.route('/updatecategory/:id').put(userValidator, updatecategory);
router.route('/deletecategory/:id').delete(deletecategory);
router.route('/getallcategories').get(getallcategories);

export default router;