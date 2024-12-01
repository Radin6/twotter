import axios from "axios"

async function getUsersPosts() {
  const response = await axios.get(import.meta.env.VITE_URL+"/api/posts/usersposts")

  return response;
}

export default getUsersPosts;