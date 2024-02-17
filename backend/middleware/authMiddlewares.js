import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // console.log("token: ", token);
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    const userCheck = await User.findById(req.user.userId);
    req.user = userCheck;
    console.log("user: ", req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  console.log("request:", req.user_type);
  if (req.user.user_type === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Access denied. Only admin can access this route." });
  }
};

export const isTeacher = async (req, res, next) => {
  if (req.user.user_type === "teacher") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Access denied. Only teacher can access this route." });
  }
};
export const isStudent = async (req, res, next) => {
  if (req.user.user_type === "student") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Access denied. Only student can access this route." });
  }
};
