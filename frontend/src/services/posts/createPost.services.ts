import axios from "axios"
import Cookies from "cookies-js";

async function createPost(formData: FormData) {
  const userToken = Cookies.get("user-twotter")

  const headers = {
    "Authorization": `Bearer ${userToken}`
  }

  const response = await axios.post(import.meta.env.VITE_URL + "/api/posts", formData, { headers: headers })
  return response;

}

export default createPost;