import express from "express";

import * as studentController from "../controllers/studentController.js";
import * as middlewares from "../middleware/authMiddlewares.js";
import * as teacherController from "../controllers/teacherController.js";
const router = express.Router();

router.get(
  "/:studentId",
  middlewares.verifyToken,
  middlewares.isStudent,
  studentController.getAllQuestionare,
);
router.post(
  "/",
  middlewares.verifyToken,
  middlewares.isTeacher,
  teacherController.createQuestionnaire,
);
router.get(
  "/check-pending/:teacherId",
  middlewares.verifyToken,
  middlewares.isTeacher,
  teacherController.hasPendingExam,
);
export default router;
// /getallquestionare/student/:studentId
// /createquestionare
// /haspendingquestionare/:teacherId
