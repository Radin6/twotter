import userStore from "@/store/userStore";
import { User, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Cookies from "js-cookie";

function LeftSidebar() {
  const { user, setUser } = userStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('user-twotter');
    setUser(null)
    navigate("/")
  }

  return (
    <aside className="h-screen w-[150px]">
      <div className="flex flex-col justify-between h-full p-3 fixed w-[150px]">
        <ul>
          <li>
            <img src="/tw-icon.png" alt="" width={60}/>
          </li>
          <li>
            <a href="/" className="flex p-2 gap-2 hover:bg-slate-50/20 hover:rounded-md cursor-pointer">
              <User className="w-4" />
              <p>Expore</p>
            </a>
          </li>
          <li>
            <a href="/profile" className="flex p-2 gap-2 hover:bg-slate-50/20 hover:rounded-md cursor-pointer" >
              <Search className="w-4" />
              <p>Profile</p>
            </a>
          </li>
        </ul>
        <div>
          {user && <Button className="my-3" variant="outline" onClick={handleLogout}>Logout</Button>}
          {user &&
            <div className="min-w-[50px] mr-5">
              <img src={user?.profileImg} className="rounded-full w-[50px] h-[50px] object-cover" alt="" width={50} height={50} />
            </div>
          }
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar;