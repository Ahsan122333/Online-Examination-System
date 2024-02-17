import express from "express";
import User from "../models/User.js";
import { isAdmin, verifyToken } from "../middleware/authMiddlewares.js";
import Questionare from "../models/Questionare.js";
import Question from "../models/Question.js";
import Subject from "../models/Subject.js";
const router = express.Router();

router.get("/pending-teachers", verifyToken, isAdmin, async (req, res) => {
  try {
    const pendingTeachers = await User.find({
      user_type: "teacher",
      isApproved: false,
    });
    res.status(200).json(pendingTeachers);
  } catch (error) {
    console.error("Error getting pending teachers:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/pending-questionare", verifyToken, isAdmin, async (req, res) => {
  try {
    const pendingQuestionare = await Questionare.find({ status: "pending" })
      .populate("teacher", "email")
      .populate("subject", "name");

    res.status(200).json(pendingQuestionare);
  } catch (error) {
    console.error("Error getting pending Questionare:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.put("/approve-teacher", verifyToken, isAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    const Teacher = await User.findOne({
      email: email,
      user_type: "teacher",
      isApproved: false,
    });
    Teacher.isApproved = true;
    await Teacher.save();
    res.status(200).json({ message: "Teacher Approved successfully" });
  } catch (error) {
    console.error("Error getting pending teachers:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/approve-questionare", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    const questionare = await Questionare.findById(id);
    questionare.status = "approved";
    await questionare.save();
    const questionares = await Questionare.find({ status: "approved" })
      .populate("subject", "name")
      .populate("teacher", "email");
    res
      .status(200)
      .json({ message: "Questionaire Approved successfully", questionares });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const questionare = await Questionare.findById(id);
    const subjectid = questionare.subject;
    await Question.deleteMany({ subject: subjectid });
    await Subject.deleteMany({ _id: subjectid });
    await Questionare.deleteOne({ _id: id });
    res.status(201).json("Questionare deleted successfully");
  } catch (error) {
    console.error("error while deleting questionare", error);
    res.status(500).json("error while deleting questionare");
  }
});
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const currentTime = new Date();
    const questionares = await Questionare.aggregate([
      {
        $match: {
          status: "approved",
          startTime: { $gt: currentTime },
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
      },
      {
        $unwind: "$subject",
      },
      {
        $unwind: "$teacher",
      },
    ]);

    res.status(200).json(questionares);
  } catch (error) {
    res
      .status(401)
      .json("error while getting questionares. Server Error", error);
    console.error("Server Error while getting questionares", error);
  }
});

export default router;
// /pendingteachers
// /pendingquestionare
// /approvependingteacher
// /approvependingquestionare
// /deletequestionare
// /getallquestionare
