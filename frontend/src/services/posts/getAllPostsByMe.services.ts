import axios from "axios"
import Cookies from "cookies-js";

async function getAllPostsByMe() {

  const userToken = Cookies.get("user-twotter");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${userToken}`
  }

  const response = await axios.get(import.meta.env.VITE_URL+"/api/posts/me", {headers: headers})

  return response;
}

export default getAllPostsByMe;