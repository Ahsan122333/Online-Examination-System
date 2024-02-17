import mongoose from "mongoose";
export const connectDB = () => {
  const mongodbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/onlineExamSystem`;
  console.log({ mongodbUrl });
  mongoose
    .connect(`${mongodbUrl}`)
    .then(() => {
      console.log("Successfully connected to the DB");
    })
    .catch((e) => {
      console.log(e);
    });
};
