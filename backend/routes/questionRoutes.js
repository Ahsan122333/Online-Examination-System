import express from "express";

import * as studentController from "../controllers/studentController.js";
import * as middlewares from "../middleware/authMiddlewares.js";
import * as teacherController from "../controllers/teacherController.js";
import * as questionController from "../controllers/questionController.js";
const router = express.Router();

// router.get(
//   "/",
//   middlewares.isAdmin,
//   middlewares.isStudent,
//   questionController.GetAllQuestion
// );

// router.get("/:subjectName", questionController.getAllQuestionBySubject);
router.get(
  "/:id",
  middlewares.verifyToken,
  middlewares.isStudent,
  studentController.getAllQuestionsInQuestionare,
);
router.post(
  "/",
  middlewares.verifyToken,
  middlewares.isTeacher,
  teacherController.createQuestion,
);
// router.delete(
//   "/:questionId",
//   middlewares.isTeacher,
//   teacherController.deleteQuestion
// );
export default router;
// /allquestion
// /getquestionsbysubject/:subjectName
// /getallquestionsinquestionare/:id
// /createquestion
// /deletequestion/:questionId
