import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuestionareSchema = new Schema(
  {
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    startTime: { type: Schema.Types.Date, required: true },
    endTime: { type: Schema.Types.Date, required: true },
  },
  { timestamps: true },
);
export default mongoose.model("Questionare", QuestionareSchema);
