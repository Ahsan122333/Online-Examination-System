import express from "express";

import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/checkisapproved", authController.checkApproved);
router.get("/allusers", userController.getAllUsers);
router.get("/usertype/:email", userController.getUserType);
router.post("/sendmail", authController.sendEmailToRegistered);
// router.use(middlewares.verifyToken);

export default router;
