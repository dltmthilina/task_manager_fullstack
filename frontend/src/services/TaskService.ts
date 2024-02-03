import axios from "axios";
import { TaskModel } from "../models/TaskModel";
const basePath = process.env.REACT_APP_BACKEND_BASE_URL;

export class TaskService {

   static token = localStorage.getItem('token');

    static async createTask (data: TaskModel) {
            console.log(basePath)
        try {
            const response = await axios.post(`${basePath}/api/tasks/create-task`, data, { headers: { "authorization": TaskService.token } });
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    static async getTaskByUserId () {
        
        try {
            const response = await axios.get(`${basePath}/api/tasks`, { headers: { "authorization": TaskService.token }});
            if(response.data){
                const tasks:TaskModel[] = []
                response.data.tasks.map((t:TaskModel)=>tasks.push(TaskModel.fromJsonData(t)))
                console.log(tasks)
                return tasks;
            }else {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getTaskByTaskId (taskId:string) {
        
        try {
            const response = await axios.get(`${basePath}/api/tasks/${taskId}`, { headers: { "authorization": TaskService.token }});
            if(response.data){
                return TaskModel.fromJsonData(response.data.task[0])
            }else {
                console.log(response)
            }
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

    static async updateTask (tid:string, data: TaskModel) {
        try {
            const response = await axios.put(`${basePath}/api/tasks/${tid}`, data, { headers: { "authorization": TaskService.token }});
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteTask (tid:string) {
        try {
            const response = await axios.delete(`${basePath}/api/tasks/${tid}`, { headers: { "authorization": TaskService.token }});
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
}