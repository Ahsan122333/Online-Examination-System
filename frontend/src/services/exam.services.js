import { apiClientt } from "../api/api-client";
import {
  FETCH_QUESTIONS,
  CALCULATE_SCORE,
  STUDENT_ANSWER,
  EXAM_QUESTIONARE,
} from "../utils/constants";
export const fetchQuestions = async (id) => {
  const response = await apiClientt.get(`${FETCH_QUESTIONS}${id}`);
  return response;
};
export const calculateScore = async (studentId, questionareId) => {
  const response = await apiClientt.post(CALCULATE_SCORE, {
    studentId,
    questionareId,
  });
  return response;
};
export const studentAnswer = async (
  studentId,
  updatedAnswers,
  questionareId,
) => {
  const response = await apiClientt.post(STUDENT_ANSWER, {
    studentId,
    answers: updatedAnswers,
    questionareId: questionareId,
  });
  return response;
};
export const examQuestionares = async (studentId) => {
  const response = await apiClientt.get(`${EXAM_QUESTIONARE}${studentId}`);
  return response;
};
