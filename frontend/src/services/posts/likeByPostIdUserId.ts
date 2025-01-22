import axios from "axios";
import Cookies from "cookies-js";

export default async function likeByPostIdUserId(postId: number, userId: number) {
  const userToken = Cookies.get("user-twotter");
  const body = {
    postId: postId,
    userId: userId
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${userToken}`
  }

  const response = await axios.post(import.meta.env.VITE_URL+"/api/posts/like", 
    body,
    {headers: headers}
  );


  console.log("response like:", response);

  return response;
}