import { apiClientt } from "../api/api-client";
import {
  APPROVE_TEACHER,
  DELETE_QUESTIONARE,
  PENDING_TEACHER,
  ALL_QUESTIONARES,
  PENDING_QUESTIONARES,
  APPROVE_QUESTIONARE,
  SEND_EMAIL,
} from "../utils/constants";

export const approveTeacher = async (email) => {
  const response = await apiClientt.put(APPROVE_TEACHER, {
    email,
  });
  return response;
};

export const deleteQuestionare = async (id) => {
  const response = await apiClientt.delete(`${DELETE_QUESTIONARE}/${id}`);
  return response;
};

export const pendingTeachers = async () => {
  const response = await apiClientt.get(PENDING_TEACHER);
  return response;
};
export const Questionares = async () => {
  const response = await apiClientt.get(ALL_QUESTIONARES);
  return response;
};
export const pendingQuestionares = async () => {
  const response = await apiClientt.get(PENDING_QUESTIONARES);
  return response;
};
export const approveQuestionare = async (id) => {
  const response = await apiClientt.put(APPROVE_QUESTIONARE, {
    id,
  });
  return response;
};
export const sendMail = async (email, password) => {
  const response = await apiClientt.post(SEND_EMAIL, {
    email,
    password,
  });
  return response;
};
