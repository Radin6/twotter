import axios from "axios";
import Cookies from "cookies-js";
import { IUserResponse } from "../../types/user";

interface IuserSignupProps {
  email: string;
  password: string
}

async function userSignup(userData : IuserSignupProps) {
  const { email, password } = userData;
  let data
  const body = {
    email: email,
    password: password
  }

  try {
    data = await axios.post<IUserResponse>(import.meta.env.VITE_URL+"/api/users/signup", body)
    const {token, ...newData} = data.data
    Cookies.set("user-twotter", token)
    
    return newData
  } catch(error){
    return console.log("userSignup error: ", data)
  }
}

export default userSignup;