import mongoose from "mongoose";
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Subject", subjectSchema);
