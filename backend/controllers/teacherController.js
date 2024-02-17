import Question from "../models/Question.js";
import Subject from "../models/Subject.js";
import Questionare from "../models/Questionare.js";
import Result from "../models/Result.js";

export const createQuestion = async (req, res) => {
  // console.log("here");
  const { questions, subjectId } = req.body;
  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  } else {
    for (let index = 0; index < questions.length; index++) {
      let question = questions[index];
      if (question.questionType == "Text") {
        const newQuestion = new Question({
          text: question.text,
          questionType: "Text",
          subject: subject._id,
          createdBy: req.user._id,
          marksCarry: Number(question.numberCarry),
          answer: question.answer,
        });
        await newQuestion.save();
      } else if (question.questionType == "MCQ") {
        const mcqOptions = question.options.map((option) => ({
          text: option.text,
          isCorrect: option.isCorrect || false,
        }));
        const mcqQuestion = new Question({
          text: question.text,
          questionType: "MCQ",
          options: mcqOptions,
          subject: subject._id,
          createdBy: req.user._id,
          marksCarry: question.numberCarry,
        });
        await mcqQuestion.save();
      }
    }
    let allQuestions = await Question.find({ subject: subject._id });
    res.status(201).json({
      data: allQuestions,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  const questionId = req.params;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ error: "Question not found" });
    }
    if (question.createdBy.toString() !== req.user._id.toString()) {
      res
        .status(403)
        .json({ error: "You are not authorize to delete the question" });
    }
    await Question.findByIdAndRemove(question._id);
  } catch (error) {
    console.error("Error while fetching deleting Question: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to create and save a questionnaire
export const createQuestionnaire = async (req, res) => {
  const { teacher, subjectId, startTime, endTime } = req.body;
  const subject = await Subject.findById(subjectId);

  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }
  try {
    console.log(startTime, endTime);
    const newQuestionnaire = new Questionare({
      teacher,
      subject: subject._id,
      startTime: startTime,
      endTime: endTime,
    });

    const savedQuestionnaire = await newQuestionnaire.save();
    res.status(201).json(savedQuestionnaire);
  } catch (error) {
    console.error("Error creating questionnaire:", error);
    res.status(500).json({ error: "Failed to create questionnaire" });
  }
};

export const hasPendingExam = async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const pendingExam = await Questionare.findOne({
      teacher: teacherId,
      status: "pending",
    });

    if (pendingExam) {
      return res.status(200).json({ hasPendingExam: true });
    } else {
      return res.status(200).json({ hasPendingExam: false });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error checking pending exam." });
  }
};

export const resultOfAllStudent = async (req, res) => {
  try {
    console.log("here");
    const results = await Result.find()
      .populate("student", "email")
      .populate("answers", "answer")
      .populate({
        path: "questionare",
        populate: {
          path: "subject",
          select: "name",
        },
      });
    //console.log(results);
    return res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error while result fetching of all students." });
  }
};

export const subjectsHavingNoQuestionares = async (req, res) => {
  const teacherId = req.params.teacherId;
  try {
    const subjectsWithQuestionnaires = await Questionare.distinct("subject");
    console.log("subjectsWithQuestionnaires", subjectsWithQuestionnaires);
    const subjectsWithoutQuestionnaires = await Subject.find({
      createdBy: teacherId,
      _id: { $nin: subjectsWithQuestionnaires },
    });
    console.log("subjectsWithoutQuestionnaires", subjectsWithoutQuestionnaires);
    res.status(200).json({ subjects: subjectsWithoutQuestionnaires });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error while getting subjects without questionnaires.",
    });
  }
};
