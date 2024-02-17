import React, { useState, useEffect } from "react";
import "../stylings/StudentDashboard.css";
import "./../stylings/StartExam.css";
import EachResult from "../components/Result/EachResult";
import * as exam from "./../services/exam.services";
import { getUserData } from "../services/user.services";
const StartExam = () => {
  const [questionareId, setQuestionareId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitCheck, setSubmitCheck] = useState(false);
  const [score, setScore] = useState("");
  const [result, setResult] = useState("");
  useEffect(() => {
    const questionare = JSON.parse(localStorage.getItem("questionare"));
    setQuestionareId(questionare);
    fetchQuestions(questionare);
  }, []);

  const fetchQuestions = async (id) => {
    try {
      const response = await exam.fetchQuestions(id);
      setQuestions(response.data);
      setScore(0);
    } catch (error) {
      console.log("error while getting the questions in a questionare", error);
    }
  };
  const handleAnsChange = (event) => {
    setAnswer(event.target.value);
  };
  const scoreCalculate = async () => {
    try {
      const questionareId = JSON.parse(localStorage.getItem("questionare"));
      const student = await getUserData();
      const studentId = student._id;
      const response = await exam.calculateScore(studentId, questionareId);
      // console.log(response.result.score);
      if (response.data) {
        setScore(response.data.result.score);
        setResult(response.data.result);
        console.log("successfully created the score");
      }
    } catch (error) {
      console.log("error while calculating score", error);
    }
  };
  const handleSaveAnswers = async (question) => {
    try {
      setSubmitCheck(true);
      let newAnswer;
      if (question.questionType === "MCQ") {
        newAnswer = {
          questionId: question._id,
          answer: selectedOption,
        };
      } else if (question.questionType === "Text") {
        newAnswer = {
          questionId: question._id,
          answer: answer,
        };
      }
      const updatedAnswers = [...answers, newAnswer];
      setAnswers(updatedAnswers);
      const student = await getUserData();
      const studentId = student._id;
      console.log("Answers are:", updatedAnswers);
      console.log("questionareId", questionareId);
      const response = exam.studentAnswer(
        studentId,
        updatedAnswers,
        questionareId
      );
      if (response) {
        console.log("successfully inserted the answers of user");
        scoreCalculate();
      }
    } catch (error) {
      console.log("error while saving the answers of user: ", error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = (question) => {
    const newAnswer = {
      questionId: question._id,
      answer: question.questionType === "MCQ" ? selectedOption : answer,
    };

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setAnswer("");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      {submitCheck ? (
        <div>
          <h2>Your quiz has been submitted. Thank you!</h2>
          <h2>Your Score is: {score}</h2>
          <EachResult result={result} />
        </div>
      ) : (
        currentQuestion && (
          <div className="question-container">
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.text}</p>
            <form>
              {currentQuestion.questionType === "MCQ" ? (
                currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        value={option.text}
                        checked={selectedOption === option.text}
                        onChange={handleOptionChange}
                      />
                      {option.text}
                    </label>
                  </div>
                ))
              ) : (
                <div>
                  <input
                    type="text"
                    value={answer}
                    onChange={handleAnsChange}
                  />
                </div>
              )}
            </form>
            {isLastQuestion ? (
              <button
                onClick={() => handleSaveAnswers(currentQuestion)}
                disabled={!selectedOption && !answer}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => handleNextQuestion(currentQuestion)}
                disabled={!selectedOption && !answer}
              >
                Next
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default StartExam;
