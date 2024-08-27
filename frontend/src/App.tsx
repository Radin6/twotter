import axios from "axios"
import { useEffect, useState } from "react"
import { LikeButton, CommentButton } from "./components/ActionButtons"
import Container from "./components/Container"
import getPostsAll from "./services/posts/getPostsAll.services"
import LeftSidebar from "./components/LeftSidebar"

interface IpostData {
  post_id: number
  userId: number
  content: string
  post_created_at: string
  post_image: string
  post_likes: number
  profile_img: string
  email: string
}

function MainContent({ postsData }: { postsData: IpostData[] }) {
  return (
    <section className="flex-1 p-8">
      <div className="flex flex-col gap-2">
        {postsData && postsData.map(post => <PostCard key={post.post_id} postData={post} />)}
      </div>
    </section>
  )
}

function PostCard({ postData }: { postData: IpostData }) {
  return (
    <div className="flex flex-row p-4 border rounded-md">
      <div className="min-w-[50px] mr-5">
        <img src={postData.profile_img} className="rounded-full" alt="" width={50} height={50} />
      </div>
      <div>
        <strong>{postData.email}</strong>
        <p>{postData.content}</p>
        <p className="text-gray-400 font-mono">{postData.post_created_at.slice(0,10)}</p>
        <div className="flex m-1 justify-around">
          <LikeButton likes={postData.post_likes} />
          <CommentButton />
        </div>
      </div>
    </div>
  )
}

function CreatePost() {
  const handleSubmit = () => {
    axios.post(import.meta.env.VITE_URL + "/api/posts",

    )
  }

  return (
    <div className="border rounded-md flex-1 m-8">
      <form className="flex flex-col m-3" onSubmit={handleSubmit}>
        <textarea className="bg-transparent flex-1 max-h-[100px] p-3 m-3" name="" id="" />
        <button type="submit" className="bg-blue-900 w-fit px-4 py-2 rounded-full">Post</button>
      </form>
    </div>
  )
}

function App() {
  const [postsData, setPostsData] = useState<IpostData[]>([])

  useEffect(() => {
    getPostsAll().then(response => setPostsData(response?.data))
  }, [])
  console.log(postsData)
  return (
    <Container>
      <LeftSidebar />
      <section>
        <CreatePost />
        <MainContent postsData={postsData} />
      </section>
    </Container>
  )
}

export default App
