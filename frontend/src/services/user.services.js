import { apiClientt } from "../api/api-client";
import { SIGNUP, LOGIN, UPLOAD_IMAGE, CHECK_PENDING } from "../utils/constants";

export const login = async (email, password) => {
  const response = await apiClientt.post(LOGIN, {
    email,
    password,
  });
  return response;
};
export const signup = async (name, email, password, user_type) => {
  const response = await apiClientt.post(SIGNUP, {
    name,
    email,
    password,
    user_type,
  });
  return response;

  // {
  //   data:{}.
  //   error:{},
  //   hasError:
  // }
};

export const adminRegister = async (name, email, password, user_type) => {
  const response = await apiClientt.post(SIGNUP, {
    name,
    email,
    password,
    user_type,
  });
  return response;

  // {
  //   data:{}.
  //   error:{},
  //   hasError:
  // }
};

export const uploadImage = async (formData) => {
  const response2 = await apiClientt.post(UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response2;
};
export const checkPendings = async (teacherId) => {
  const response = await apiClientt.get(`${CHECK_PENDING}${teacherId}`);
  return response;
};

export const setQuestionareId = async (questionare) => {
  localStorage.setItem("questionare", JSON.stringify(questionare._id));
};

export const setUserData = async (user) => {
  localStorage.setItem("userData", JSON.stringify(user));
};
export const setUserId = async (userId) => {
  localStorage.setItem("userId", userId);
};
export const setToken = async (token) => {
  localStorage.setItem("token", token);
};

export const getQuestionareId = () => {
  const questionare = JSON.parse(localStorage.getItem("questionare"));
  return questionare;
};

export const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log("user123221", user);
  return user;
};

export const getToken = async () => {
  const token = localStorage.getItem("token");
  return token;
};
