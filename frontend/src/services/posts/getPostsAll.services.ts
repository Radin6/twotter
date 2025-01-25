import axios from "axios"
import Cookies from "cookies-js";

async function getPostsAll() {
  const userToken = Cookies.get("user-twotter")

  const headers = {
    "Authorization": `Bearer ${userToken}`
  }

  const response = await axios.get(import.meta.env.VITE_URL+"/api/posts/all", {headers: headers})

  return response;
}

export default getPostsAll;