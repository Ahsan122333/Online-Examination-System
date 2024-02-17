import mongoose from "mongoose";
const Schema = mongoose.Schema;
const resultSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  questionare: {
    type: Schema.Types.ObjectId,
    ref: "Questionare",
    required: true,
  },
  answers: [
    { type: Schema.Types.ObjectId, ref: "StudentAnswer", required: true },
  ],
  score: Number,
});

export default mongoose.model("Result", resultSchema);
