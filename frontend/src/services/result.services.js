import { apiClientt } from "../api/api-client";
import { GET_RESULT } from "../utils/constants";
export const getResult = async () => {
  const response = await apiClientt.get(GET_RESULT);
  return response;
};
