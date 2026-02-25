import { Router } from "express";
import {upload} from "../middleware/multer.js";
import { uploadFile } from "../controllers/file.controller.js";
const router = Router();
router.route("/uploads").post(upload.single("image"), uploadFile);


export default router;