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
import Button from "@/components/Button"
import toast from "react-hot-toast"

export function MainContent({ postsData }: { postsData: IpostData[] }) {

  return (
    <section className="flex-1 p-8">
      <div className="flex flex-col gap-2">
        {postsData.length > 0 && [...postsData].map(post => <PostCard key={post.post_id} postData={post} />)}
      </div>
    </section>
  )
}

function Home() {
  const [postsData, setPostsData] = useState<IpostData[]>([])
  const { user } = userStore()
  const navigate = useNavigate();

  //Pagination
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [hasMore, setHasMore] = useState(true)

  const getNewPages = () => {
    setPage(prev => prev+1)
    try {
      getPostsAll({page: page+1, limit: 5}).then((postsData)=> {
        if (postsData?.data < limit) {
          setHasMore(false)
        }
        setPostsData(prev => [...prev, ...postsData?.data])
      })
    } catch (err) {
      console.log(err)
    }
    
  }

  useEffect(() => {
    try {
      getPostsAll({}).then(response => { setPostsData(response?.data) })
    } catch (err) {
      toast.error("Error loading posts")
    }
  }, [])

  return (
    <Container>
      <LeftSidebar />
      <section className="flex-1 border border-gray-600">
        {user ?
          <CreatePost /> :
          <div className="flex-1 m-8 flex flex-col gap-2 ">
            <p>You have to log in in order to create a new post</p>
            <div className="flex gap-5 items-center">
              <Button onClick={() => navigate("/login")} variant="outline">
                Login
              </Button>
              <p>{"or"}</p>
              <Button onClick={() => navigate("/signup")} variant="blue">
                Signup
              </Button>
            </div>
          </div>
        }
        {
          postsData.length > 0 ?
            <>
              <MainContent postsData={postsData} />
              {hasMore && <Button className="block w-fit mx-auto mb-5" variant="blue" onClick={getNewPages}>Load more</Button>}
            </>
            :
            <div className="flex justify-center items-center w-full h-[400px]">
              <div className="animate-pulse">
                <img  src="./tw-icon.png" alt="" width={100} />
                <p className="w-full text-center">Loading</p>
              </div>
            </div>
        }
      </section>
      <RightSidebar />
    </Container>
  )
}

export default Home;
