import Cookies from "cookies-js";
import axios from "axios";
import handleAxiosError from "../../ustils/handleAxiosError";
import { IUser, IUserResponse } from "../../types/user";

interface IuserLoginProps {
  email: string;
  password: string
}

async function userLogin(userData : IuserLoginProps) {
  const { email, password } = userData;
  let data

  const body = {
    email: email,
    password: password
  }

  try {
    data = await axios.post(import.meta.env.VITE_URL+"/api/users/login", body)
    const {token, ...newData} = data.data
    Cookies.set("user-twotter", token)
    
    return newData

  } catch(error) {
    console.log("userLogin error: ", error)
    return handleAxiosError(error)
  }
}

export default userLogin;