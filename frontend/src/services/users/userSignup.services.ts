import axios from "axios";
import Cookies from "cookies-js";
import handleAxiosError from "@/utils/handleAxiosError";
import { IUserResponse } from "../../types/user";

interface IuserSignupProps {
  email: string
  password: string
  username: string
}

async function userSignup(userData : IuserSignupProps) {
  const { email, password, username } = userData;
  let data
  const body = {
    email: email,
    password: password,
    username: username
  }

  try {
    data = await axios.post(import.meta.env.VITE_URL+"/api/users/signup", body)
    const {token, ...newData} = data.data
    Cookies.set("user-twotter", token)
    
    return newData
  } catch(error){
    return handleAxiosError(error)
  }
}

export default userSignup;