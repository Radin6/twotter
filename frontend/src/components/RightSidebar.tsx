function RightSidebar() {
  
  return (
    <aside className=" h-screen w-[150px]">
      <div className="flex flex-col justify-between h-full p-3 fixed w-[150px]">
        <ul>
          <li className="p-2 hover:bg-slate-50/30 cursor-pointer">user1</li>
          <li className="p-2 hover:bg-slate-50/30 cursor-pointer">user2</li>
          <li className="p-2 hover:bg-slate-50/30 cursor-pointer">user3</li>
        </ul>
      </div>
    </aside>
  )
}

export default RightSidebar;