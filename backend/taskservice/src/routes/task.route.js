import express from 'express';
import { createTask, deleteTask, getAllTask } from '../controllers/task.controller.js';
const taskRouter = express.Router();


taskRouter.post('/create-task', createTask);
taskRouter.get('/get-all-tasks', getAllTask);
taskRouter.delete('/delete-task/:taskId', deleteTask);


export default taskRouter;