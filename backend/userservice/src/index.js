import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.config.js';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send('User Service is running');
})

app.use('/api/v1/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server running on PORT ---> ${PORT}`);
    connectDB();
})