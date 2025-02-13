import axios, { AxiosResponse } from "axios"
import Cookies from "cookies-js";

interface getPostsAllProps {
  page?: number
  limit?: number
}

async function getPostsAll({page=1, limit}: getPostsAllProps): Promise<AxiosResponse<any, any>> {
  const userToken = Cookies.get("user-twotter")

  const headers = {
    "Authorization": `Bearer ${userToken}`
  }

  const response = await axios.get(import.meta.env.VITE_URL+`/api/posts/all?page=${page}&limit=${limit}`, {headers: headers})

  return response;
}

export default getPostsAll;