import { apiClientt } from "../api/api-client";
import { CREATE_SUBJECT } from "../utils/constants";
export const createSubject = async (subject, user) => {
  const response = await apiClientt.post(CREATE_SUBJECT, {
    name: subject,
    createdBy: user._id,
  });
  return response;
};
