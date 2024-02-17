import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
const secretKey = process.env.SECRET_KEY;
const service = process.env.SERVICE;
const user = process.env.USER;
const pass = process.env.PASS;
// User signup logic
export const signup = async (req, res) => {
  const { name, email, password, user_type } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      user_type,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, secretKey, {
      expiresIn: "1h",
    });
    const mailTransporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: "hamza.masood@devsinc.com",
        pass: "zovwipzynvbyxfvr",
      },
    });
    mailTransporter.sendMail({
      from: '"Online Examination System  👻" <billingssam567@gmail.com>',
      to: email,
      subject: "Invite Mail",
      text: "Congratulations, You've been invited App of Online examination system, Login to your dashboard and accept the invite http://localhost:5000",
    });

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  const existingUserWithoutPassword = await User.findOne({ email }).select(
    "-password",
  );

  try {
    if (!existingUser) {
      return res.status(404).json({
        error: "User not exist. Please check your email and password",
      });
    }
    const passwordCheck = await bcrypt.compare(password, existingUser.password);
    if (!passwordCheck) {
      return res
        .status(404)
        .json({ error: "Invalid Password. Please check your password" });
    }
    const token = jwt.sign({ userId: existingUser._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ user: existingUserWithoutPassword, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const checkApproved = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isApproved = user.isApproved;
    res.json({ isApproved });
  } catch (error) {
    console.error("Error while checking user approval:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const sendEmailToRegistered = async (req, res) => {
  try {
    const { name, email, password, user_type } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      user_type,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, secretKey, {
      expiresIn: "1h",
    });
    const mailTransporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: "hamza.masood@devsinc.com",
        pass: "zovwipzynvbyxfvr",
      },
    });
    mailTransporter.sendMail({
      from: '"Online Examination System  👻" <gandalfthegrey9t@gmail.com>',
      to: email,
      subject: "Invite Mail",
      text: `Congratulations, You've been invited App of Online examination system, Login to your dashboard and accept the invite http://localhost:5000 email: ${email}, password: ${password}`,
    });

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
