import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentAnswerSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  answer: { type: Schema.Types.String, required: true },
  questionare: {
    type: Schema.Types.ObjectId,
    ref: "Questionare",
    required: true,
  },
  isCorrect: { type: Schema.Types.Boolean, default: false },
});
export default mongoose.model("StudentAnswer", studentAnswerSchema);
