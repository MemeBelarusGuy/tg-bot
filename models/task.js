import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    finishAt: {
        type: Number,
    },
    done: {
        type: Boolean,
    },
}, { timestamps: true });
export default mongoose.model("Task", TaskSchema);