import axios from "axios"
import { UserFormModel, UserModel } from "../models/UserModel"
const basePath = process.env.BACKEND_BASE_URL

export class userService {

    static userLogin = async(data:UserModel) => {
        try {
           const response = await axios.post(`${basePath}/api/users/login`, data)
           console.log(response)
    
        } catch (error) {
            console.log(error);
        }
    }

    static userRegister = async(data:UserFormModel) => {

        try {
            const response = await axios.post(`${basePath}/api/users/register`, data)
            console.log(response)
            
        } catch (error) {
            console.log(error);
        }
    }
}

