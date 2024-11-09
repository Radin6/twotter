import axios from "axios";

async function getUserById(id: number) {
  const userToken = Cookies.get("user-twotter");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${userToken}`
  }

  const data = await axios.get(import.meta.env.BASE_URL+`/api/users/${id}`, {headers: headers})

  return data;
}

export default getUserById;