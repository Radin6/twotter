import { useEffect, useState } from "react"
import PostCard from "@/components/PostCard"
import Container from "@/components/Container"
import getPostsAll from "@/services/posts/getPostsAll.services"
import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"
import { IpostData } from "@/types/post"
import toast, { Toaster } from "react-hot-toast"
import createPost from "@/services/posts/createPost.services"

function MainContent({ postsData }: { postsData: IpostData[] }) {

  return (
    <section className="flex-1 p-8">
      <div className="flex flex-col gap-2">
        {postsData && [...postsData].reverse().map(post => <PostCard key={post.post_id} postData={post} />)}
      </div>
    </section>
  )
}

function CreatePost() {
  const [content, setContent] = useState("")
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (content.length) {
      await createPost({content});
      setTimeout(()=>location.reload(), 1000)
      return toast.success("Post created successfully!")
    }
    
    return toast.error("Content is empty")
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

function Home() {
  const [postsData, setPostsData] = useState<IpostData[]>([])

  useEffect(() => {
    getPostsAll().then(response => setPostsData(response?.data))
  }, [])
  
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

export default Home;
