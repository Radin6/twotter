import axios from "axios"

interface getCommentsByPostId {
  postId: number
}

async function getCommentsByPostId(data: getCommentsByPostId) {
  const { postId } = data;
  const response = await axios.get(import.meta.env.VITE_URL+`/api/posts/comment/${postId}`)

  return response;
}

export default getCommentsByPostId;