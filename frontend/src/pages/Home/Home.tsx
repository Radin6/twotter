import { useEffect, useState } from "react"
import PostCard from "@/components/PostCard"
import Container from "@/components/Container"
import getPostsAll from "@/services/posts/getPostsAll.services"
import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"
import { IpostData } from "@/types/post"
import userStore from "@/store/userStore"
import { useNavigate } from 'react-router-dom';
import CreatePost from "./_components/CreatePost"

function MainContent({ postsData }: { postsData: IpostData[] }) {

  return (
    <section className="flex-1 p-8">
      <div className="flex flex-col gap-2">
        {postsData && [...postsData].reverse().map(post => <PostCard key={post.post_id} postData={post} />)}
      </div>
    </section>
  )
}

function Home() {
  const [postsData, setPostsData] = useState<IpostData[]>([])
  const { user } = userStore()
  const navigate = useNavigate();

  useEffect(() => {
    getPostsAll().then(response => {setPostsData(response?.data); console.log(response?.data)})
  }, [])
  
  return (
    <Container>
      <LeftSidebar />
      <section className="flex-1">
        {user ? 
          <CreatePost /> : 
          <div className="flex-1 m-8 flex flex-col gap-2 ">
            <p>You have to log in in order to create a new post</p>
            <button onClick={()=>navigate("/login")} className="p-3 rounded-lg bg-slate-700 w-fit">
              Login
            </button>
          </div>
        }
        <MainContent postsData={postsData} />
      </section>
      <RightSidebar />
    </Container>
  )
}

export default Home;
