import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import allRoutes from "./routes/index.js";
import morgan from "morgan";
import { connectDB } from "./config/db.config.js";
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", allRoutes);
connectDB();
const port = process.env.NODE_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
