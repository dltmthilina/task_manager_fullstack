import axios from "axios";
import { TaskModel } from "../models/TaskModel";
const basePath = process.env.REACT_APP_BACKEND_BASE_URL;

export class TaskService {

    static async createTask (data: TaskModel) {
            console.log(basePath)
        try {
            const response = await axios.post(`${basePath}/api/tasks/create-task`, data);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    static async getTaskByUserId (uid:string) {
        try {
            const response = await axios.get(`${basePath}/api/tasks/${uid}`);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    static async updateTaskStatus (tid:string) {
        try {
            const response = await axios.patch(`${basePath}/api/tasks/status/${tid}`);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    static async updateTask (tid:string) {
        try {
            const response = await axios.put(`${basePath}/api/tasks/${tid}`);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteTask (tid:string) {
        try {
            const response = await axios.delete(`${basePath}/api/tasks/${tid}`);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
}