import userStore from "../store/userStore";

function LeftSidebar() {
  const { user } = userStore()
  return (
    <aside className="w-[200px] h-screen bg-slate-700">
      <div className="flex flex-col justify-between h-full p-8">
        <ul>
          <li className="p-2 hover:bg-slate-50/30 cursor-pointer">Home</li>
          <li className="p-2 hover:bg-slate-50/30 cursor-pointer">Expore</li>
          <li className="p-2 hover:bg-slate-50/30 cursor-pointer">Profile</li>
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