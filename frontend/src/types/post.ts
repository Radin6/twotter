export interface IpostData {
  post_id: number
  userId: number
  content: string
  post_created_at: string
  post_image: string
  post_likes: number
  profile_img: string
  email: string
}

export interface Icomment {
  comment_id: number,
  post_id: number,
  user_id: number,
  comment_content: string,
  comment_likes: number,
  created_at: string
}