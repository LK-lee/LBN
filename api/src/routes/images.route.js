import { Router } from "express";
import {upload} from "../middleware/multer.js";
import { uploadFile } from "../controllers/file.controller.js";
const router = Router();
router.route("/upload").post(upload.fields([{ name: "profile_image", maxCount: 1 },{ name: "company_logo", maxCount: 1 }]), uploadFile);

export default router;