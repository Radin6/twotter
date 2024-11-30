import userStore from "@/store/userStore";
import { User, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function LeftSidebar() {
  const { user } = userStore()
  const navigate = useNavigate()

  return (
    <aside className="h-screen w-[150px]">
      <div className="flex flex-col justify-between h-full p-3 fixed w-[150px]">
        <ul>
          <li className="flex p-2 gap-2 hover:bg-slate-50/20 hover:rounded-md cursor-pointer" onClick={()=>navigate("/")}>
            <User className="w-4" />
            <p>Expore</p>
          </li>
          <li className="flex p-2 gap-2 hover:bg-slate-50/20 hover:rounded-md cursor-pointer" onClick={()=>navigate("/profile")} >
            <Search className="w-4" />
            <p>Profile</p>
          </li>
        </ul>
        <div>
          {user &&
            <div className="min-w-[50px] mr-5">
              <img src={user?.profileImg} className="rounded-full" alt="" width={50} height={50} />
            </div>
          }
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar;