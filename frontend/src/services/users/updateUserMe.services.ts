import axios from "axios"
import Cookies from "cookies-js"

async function updateUserMe(formData: FormData) {
  const userToken = Cookies.get("user-twotter")

  const headers = {
    "Authorization": `Bearer ${userToken}`
  }

  const response = await axios.patch(import.meta.env.VITE_URL + "/api/users", formData, { headers: headers })
  return response

}

export default updateUserMe