import axios from "axios"

async function getPostsAll() {
  const response = await axios.get(import.meta.env.VITE_URL+"/api/posts/all")

  return response;
}

export default getPostsAll;