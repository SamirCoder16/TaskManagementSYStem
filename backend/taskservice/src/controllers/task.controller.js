import task from "../models/task.model.js";
import {channel} from "../utils/retryQueue.js";


export const createTask = async (req, res) => {
  try {
    const { title, description, createdAt, userId } = req.body;

    if (!title || !description || !userId || !createdAt) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTask = new task({
      title,
      description,
      userId,
      createdAt,
    });

    const savedTask = await newTask.save();

    // Publish the task creation event to RabbitMQ
    const msg = { taskId: newTask._id, title, userId };
    if (!channel) {
      console.error("RabbitMQ channel is not available");
      return res.status(500).json({ message: "Internal server error" });
    }
    channel.sendToQueue("task_created", Buffer.from(JSON.stringify(msg)));

    return res.status(201).json({
      message: "Task created successfully",
      tasks: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await task.find();
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
