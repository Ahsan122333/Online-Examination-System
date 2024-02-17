import express from "express";

import * as middlewares from "../middleware/authMiddlewares.js";
import * as teacherController from "../controllers/teacherController.js";
import * as subjectController from "../controllers/subjectController.js";
const router = express.Router();

router.post(
  "/",
  middlewares.verifyToken,
  middlewares.isTeacher,
  subjectController.createSubject,
);
router.get(
  "/:teacherId",
  middlewares.verifyToken,
  middlewares.isTeacher,
  subjectController.getAllSubjects,
);
router.get(
  "/no-questionare/:teacherId",
  teacherController.subjectsHavingNoQuestionares,
);
export default router;
// /createsubject
// /getallsubject/:studentId
// /getallsubjectquestionare/:teacherId
