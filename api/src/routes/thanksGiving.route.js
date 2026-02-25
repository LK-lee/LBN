import {addThanknote,getThanksnote,getThanksnotebyid,updateThanksnote,deleteThanksnote,getThanksnoteamount,getUserTransactions,getAllTransactions} from '../controllers/thanksGiving.controller.js';
import userValidator from '../validators/thanksGiving.validator.js';
import { Router } from 'express';

const router = Router();

router.route('/addthanksnote').post(userValidator, addThanknote);
router.route('/getthanksnote').get(getThanksnote);
router.route('/getthanksnotebyid/:id').get(getThanksnotebyid);
router.route('/getthanksnoteamount').get(getThanksnoteamount);
router.route('/updatethanksnote/:id').put(userValidator, updateThanksnote);
router.route('/deletethanksnote/:id').delete(deleteThanksnote);
router.route('/getusertransactions').get(getUserTransactions);
router.route('/getalltransactions').get(getAllTransactions);

export default router;
