import express from "express";

import * as studentController from "../controllers/studentController.js";
import * as teacherController from "../controllers/teacherController.js";
const router = express.Router();

router.get("/", teacherController.resultOfAllStudent);

// router.get("/:studentId/:questionareId", studentController.singleResult);
export default router;
// /resultofallstudents
// /singleresult/:studentId/:questionareId
