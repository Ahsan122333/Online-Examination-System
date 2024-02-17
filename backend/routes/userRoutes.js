import express from "express";

import * as studentController from "../controllers/studentController.js";
import * as middlewares from "../middleware/authMiddlewares.js";
import { upload } from "../middleware/uploadMiddlewares.js";
const router = express.Router();
router.post(
  "/uploadimage",
  upload,
  middlewares.verifyToken,
  middlewares.isStudent,
  studentController.updateProfilePicture,
);
router.get(
  "/profileshow/:studentId",
  middlewares.verifyToken,
  middlewares.isStudent,
  studentController.profileShow,
);
export default router;
