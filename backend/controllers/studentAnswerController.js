import StudentAnswer from "../models/StudentAnswer.js";
import Result from "../models/Result.js";

export const createStudentAnswers = async (req, res) => {
  const { studentId, answers, questionareId } = req.body;
  try {
    const savePromises = [];

    console.log(answers, "ansdww");
    for (const eachAnswer of answers) {
      const { questionId, answer } = eachAnswer;
      // console.log(questionareId);
      const answerPromise = StudentAnswer.create({
        student: studentId,
        question: questionId,
        answer: answer,
        questionare: questionareId,
      });

      savePromises.push(answerPromise);
    }

    const savedStudentAnswers = await Promise.all(savePromises);
    console.log(savedStudentAnswers, "dasdsa");
    res.status(201).json(savedStudentAnswers);
  } catch (error) {
    console.error("Error while creating Student response of answer: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getStudentAnswers = async (req, res) => {
  try {
    const allAnswers = await StudentAnswer.find();
    res.status(201).json(allAnswers);
  } catch (error) {
    console.error("Error fetching Answer of Student: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const CalculateScore = async (req, res) => {
  const { studentId, questionareId } = req.body;
  try {
    const studentAnswers = await StudentAnswer.find({
      questionare: questionareId,
      student: studentId,
    }).populate("question");
    console.log("answers:", studentAnswers);
    let marks = 0;
    for (const studentAnswer of studentAnswers) {
      let question = studentAnswer.question;
      //console.log(question, "dasdas");
      if (question) {
        if (question.questionType === "MCQ") {
          const selectedOption = studentAnswer.answer;
          const correctOption = question.options.find(
            (option) => option.isCorrect,
          );

          if (correctOption && selectedOption === correctOption.text) {
            marks += question.marksCarry;
            studentAnswer.isCorrect = true;
            await studentAnswer.save();
          }
        } else if (question.questionType === "Text") {
          if (
            String(studentAnswer.answer).toLowerCase() ===
            String(studentAnswer.question.answer).toLowerCase()
          ) {
            console.log(
              String(studentAnswer.answer).toLowerCase() ===
                String(studentAnswer.question.answer).toLowerCase(),
              studentAnswer.answer,
              studentAnswer.question.answer,
            );
            console.log();
            marks += question.marksCarry;
            studentAnswer.isCorrect = true;
            await studentAnswer.save();
          }
        }
      }
    }
    // console.log(studentAnswers);
    const result = await Result.create({
      student: studentId,
      questionare: questionareId,
      answers: studentAnswers,
      score: Number(marks),
    });
    if (result) {
      res.status(200).json({ result });
    }
  } catch (error) {
    console.error("Error while calculating score: ", error);
    res.status(500).json({ error: "Server error" });
  }
};
