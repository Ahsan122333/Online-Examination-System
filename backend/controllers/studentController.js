// const User = require("../models/User");
import Questionare from "../models/Questionare.js";

// const Subject = require("../models/Subject");
import Question from "../models/Question.js";

import Subject from "../models/Subject.js";
import User from "../models/User.js";
import StudentAnswer from "../models/StudentAnswer.js";
import Result from "../models/Result.js";
import { uploadImage } from "../config/cloudinary.config.js";

export const getAllQuestionare = async (req, res) => {
  const { studentId } = req.params;
  try {
    const questionares = await Questionare.find({
      status: "approved",
    })
      .populate("subject", "name")
      .populate("teacher", "email");
    let questionareIds = await questionares.map((item) => item._id);
    console.log(studentId, "dasdas");
    const resultPromises = questionareIds.map(async (questionareId) => {
      const result = await Result.findOne({
        student: studentId,
        questionare: questionareId,
      });

      return { questionareId, hasResult: !!result };
    });

    const results = await Promise.all(resultPromises);

    const questionareIdsWithNoResults = results
      .filter(({ hasResult }) => !hasResult)
      .map(({ questionareId }) => questionareId);

    const validQuestionares = questionares.filter((questionare) =>
      questionareIdsWithNoResults.includes(questionare._id),
    );

    console.log(validQuestionares, "dasda");

    res.status(200).json({ validQuestionares });
  } catch (error) {
    res
      .status(401)
      .json("error while getting questionares. Server Error", error);
    console.error("Server Error while getting questionares", error);
  }
};

export const getAllQuestionsInQuestionare = async (req, res) => {
  const { id } = req.params;
  try {
    const questionare = await Questionare.findById(id);
    const subject = await Subject.findById(questionare.subject);
    const questions = await Question.find({ subject: subject._id });
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json("Error while getting questions in a questionare. Server Error");
    console.error(
      "Server Error while getting questions in a questionare",
      error,
    );
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    console.log(req.file);
    let uploadedImageUrl = await uploadImage(req?.file);
    const user = await User.findById(req.user._id);

    user.profilePicture = uploadedImageUrl;
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error("error while uploading picture", error);
    res.status(400).json({ error: "error while uploading picture" });
  }
};

export const singleResult = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const questionareId = req.params.questionareId;
    const result = await Result.find({
      questionare: questionareId,
      student: studentId,
    }).populate("answers", "answer");
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: "error while fetching single result" });
    console.error("error while while fetching single result", error);
  }
};

export const profileShow = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await User.findById(studentId);
    const path = student.profilePicture;
    res.status(200).json({ path });
  } catch (error) {
    console.error("error while fetching the profile picture of student", error);
  }
};
