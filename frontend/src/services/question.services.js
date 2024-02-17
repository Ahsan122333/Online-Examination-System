import { apiClientt } from "../api/api-client";
import { GET_SUBJECT } from "../utils/constants";

export const getSubject = async (teacherId) => {
  const response = await apiClientt.get(`${GET_SUBJECT}${teacherId}`);
  return response;
};
