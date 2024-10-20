import axios from "axios"
import Cookies from "cookies-js";

interface createPost {
  content: string
}

async function createPost(data : createPost) {
  const { content } = data;
  const userToken = Cookies.get("user-twotter")

  const body = {
    content: content
  }
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${userToken}`
  }

  const response = axios.post(import.meta.env.VITE_URL + "/api/posts", body, {headers: headers})
    
  return response;
}

export default createPost;