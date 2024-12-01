import getUsersPosts from "@/services/posts/getUsersPosts.services";
import { useEffect, useState } from "react";


function RightSidebar() {
  const [usersPosts , setUsersPosts] = useState<Array<{email: string, total_posts: number}>>([])
  
  useEffect(() => {
    getUsersPosts().then(response => { setUsersPosts(response?.data); console.log(response?.data) })
  }, [])
  
  return (
    <aside className=" h-screen w-[150px]">
      <div className="flex flex-col h-full p-3 fixed">
        <h3 className="font-semibold">Posts Ranking</h3>
        <ul>
          {
            usersPosts && usersPosts?.map((item, index) => 
              <li className="p-2" key={index}>
                <p className="flex">
                  <span>{item.total_posts}</span>{" · "+item.email}
                </p>
              </li>
            )
          }
        </ul>
      </div>
    </aside>
  )
}

export default RightSidebar;