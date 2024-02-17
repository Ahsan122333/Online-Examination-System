import mongoose from "mongoose";
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new Schema({
  text: { type: String, required: true },
  questionType: { type: String, enum: ["MCQ", "Text"], required: true },
  options: [optionSchema],
  subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  marksCarry: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  answer: { type: String },
});

export default mongoose.model("Question", questionSchema);
