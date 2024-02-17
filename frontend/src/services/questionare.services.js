import { apiClientt } from "../api/api-client";
import {
  NO_QUESTIONARE,
  CREATE_QUESTION,
  CREATE_QUESTIONARE,
} from "../utils/constants";

export const noQuestionare = async (teacherId) => {
  const response = await apiClientt.get(`${NO_QUESTIONARE}${teacherId}`);
  return response;
};
export const createQuestion = async (questions, subject) => {
  const response = await apiClientt.post(CREATE_QUESTION, {
    questions,
    subjectId: subject,
  });
  return response;
};
export const createQuestionare = async (user, subject, startTime, endTime) => {
  const response = await apiClientt.post(CREATE_QUESTIONARE, {
    teacher: user._id,
    subjectId: subject,
    startTime: startTime,
    endTime: endTime,
  });
  return response;
};
