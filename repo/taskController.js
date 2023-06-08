import TaskModel from '../models/task.js'
import UserModel from '../models/user.js'
import {ObjectId} from "mongodb";

export const getUserTasks = async (username) => {
    const user = await UserModel.findOne({username});
    if (!user) {
        return [];
    } else {
        const tasks=[];
        for(let key of user.tasks){
            tasks.push(new ObjectId(key));
        }
        const res=await TaskModel.find({_id:{$in:[...tasks]}});
        return res;
    }
}
export const createTask = async (title, finishAt) => {
    const task = new TaskModel({
        title,
        finishAt,
        done: false
    })
    await task.save();
    return task._id.toString();
}
export const editTaskTitle = async (taskId, title) => {
    const task = await TaskModel.findByIdAndUpdate(taskId, {
        title
    });
    if (!task) return 0;
    return 1;
}
export const editTaskTime = async (taskId, hours) => {
    const task = await TaskModel.findByIdAndUpdate(taskId, {
        finishAt: Date.now() + hours * 3600000
    });
    if (!task) return 0;
    return 1;
}
export const editTaskStatus = async (taskId, done) => {
    const task = await TaskModel.findByIdAndUpdate(taskId, {
        done
    })
    if (!task) return 0;
    return 1;
}
export const deleteTask = async (taskId, username) => {
    const task = await TaskModel.findByIdAndDelete(taskId);
    if (!task) return 0;
    const user = await UserModel.findOne({username})
    if (!user) {
        return 0;
    } else {
        user.tasks = user.tasks.filter(item => item !== taskId.toString());
        await user.save();
        return 1;
    }
}