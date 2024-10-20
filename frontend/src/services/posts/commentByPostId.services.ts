import axios, { AxiosResponse } from "axios"
import Cookies from "cookies-js";

interface commentByPostId {
  postId: number,
  comment: string
}

async function commentByPostId(data : commentByPostId) : Promise<AxiosResponse<any>> {
  const {postId, comment} = data;
  const userToken = Cookies.get("user-twotter");

  const body = {
    postId: postId,
    content: comment
  }
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${userToken}`
  }

  const response = await axios.post(import.meta.env.VITE_URL+"/api/posts/comment",
    body,
    {headers: headers}
  )

  return response;
}

export default commentByPostId;