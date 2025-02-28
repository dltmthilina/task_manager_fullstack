import axios, { AxiosError } from "axios";
import { UserFormModel, UserModel } from "../models/UserModel";
const basePath = process.env.REACT_APP_BACKEND_BASE_URL;

export class UserService {
  static userLogin = async (data: UserModel) => {
    try {
      const response = await axios.post(`${basePath}/api/users/login`, data);
      if (response.data.success === true) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  static userRegister = async (data: UserFormModel) => {
    try {
      const response = await axios.post(`${basePath}/api/users/register`, data);
      return response;
    } catch (error: any) {
      return error.response;
    }
  };
}
