import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

const task = mongoose.model('Task', taskSchema);
export default task;