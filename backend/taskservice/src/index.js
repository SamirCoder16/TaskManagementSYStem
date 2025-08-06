import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.config.js";
import taskRouter from "./routes/task.route.js";
import { connectRabbitMQwithRetry } from "./utils/retryQueue.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("Task Service is running");
});

app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Task Service is running on port -----> ${PORT}`);
  connectDB();
  connectRabbitMQwithRetry();
});
