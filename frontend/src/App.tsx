import axios from "axios"
import { useEffect, useState } from "react"
import PostCard from "./components/PostCard"
import Container from "./components/Container"
import getPostsAll from "./services/posts/getPostsAll.services"
import LeftSidebar from "./components/LeftSidebar"
import RightSidebar from "./components/RightSidebar"
import { IpostData } from "./types/post"
import toast, {Toaster } from "react-hot-toast"
import Cookies from "cookies-js"
import { set } from "cookies"

function MainContent({ postsData }: { postsData: IpostData[] }) {
  return (
    <section className="flex-1 p-8">
      <div className="flex flex-col gap-2">
        {postsData && postsData.map(post => <PostCard key={post.post_id} postData={post} />)}
      </div>
    </section>
  )
}

function CreatePost() {
  const [content, setContent] = useState("")
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userToken = Cookies.get("user-twotter")
    const body = {
      content: content
    }
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`
    }
    
    if (content.length) {
      axios.post(import.meta.env.VITE_URL + "/api/posts", body, {headers: headers})
      .then(response => {console.log(response); return toast.success("Post created successfully!");})
      .catch(error => {console.log(error); return toast.error("Content is empty")})
      
    }
    
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target?.value
    console.log(newContent)
    setContent(newContent)
  }

  return (
    <div className="border rounded-md border-gray-500 flex-1 m-8">
      <form className="flex flex-col m-3" onSubmit={event => handleSubmit(event)}>
        <textarea 
          onChange={(e)=> handleContentChange(e)}
          className="bg-transparent flex-1 max-h-[100px] p-3 m-3" name="" id="" 
        />
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
      <Toaster  />
      <LeftSidebar />
      <section className="flex-1">
        <CreatePost />
        <MainContent postsData={postsData} />
      </section>
      <RightSidebar />
    </Container>
  )
}

export default App
