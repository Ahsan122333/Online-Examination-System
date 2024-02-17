import express from "express";

import * as studentAnswerController from "../controllers/studentAnswerController.js";
import * as middlewares from "../middleware/authMiddlewares.js";
const router = express.Router();
router.post(
  "/",
  middlewares.verifyToken,
  middlewares.isStudent,
  studentAnswerController.createStudentAnswers,
);

router.post(
  "/calculatescore",
  middlewares.verifyToken,
  middlewares.isStudent,
  studentAnswerController.CalculateScore,
);
export default router;
// /createstudentanswer
// /calculatescore
