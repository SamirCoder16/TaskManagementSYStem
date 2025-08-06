import express from 'express';
import { getAllUsers, getUser, registerUser } from '../controllers/user.controller.js';


const userRouter = express.Router();

userRouter.post('/register-user', registerUser);
userRouter.get('/get/:userId', getUser);
userRouter.get('/all-users', getAllUsers);


export default userRouter;