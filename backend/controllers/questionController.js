import Question from "../models/Question.js";
import Subject from "../models/Subject.js";
export const GetAllQuestion = async (req, res) => {
  try {
    const allQuestions = await Question.find();
    res.status(200).json(allQuestions);
  } catch (error) {
    console.error("Error fetching questions: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};
export const getAllQuestionBySubject = async (req, res) => {
  const subjectName = req.params.subjectName;

  try {
    const subject = await Subject.findOne({ name: subjectName });
    if (!subject) {
      return res
        .status(404)
        .json({ error: "There is no Subject by that name" });
    }
    const questionBySubject = await Question.find({ subject: subject._id });
    res.status(200).json({ subject, questions: questionBySubject });
  } catch (error) {
    console.error("Error while fetching questions across each subject:", error);
    res.status(500).json({ error: "Server error" });
  }
};
