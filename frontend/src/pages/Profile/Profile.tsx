import Container from "@/components/Container";
import LeftSidebar from "@/components/LeftSidebar";
import userStore from "@/store/userStore";
import { IpostData } from "@/types/post"

import { useNavigate } from "react-router-dom";
import { MainContent } from "../Home/Home";
import getAllPostsByMe from "@/services/posts/getAllPostsByMe.services";
import { useEffect, useState } from "react";
import RightSidebar from "@/components/RightSidebar";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";

function ProfilePage() {
  const [userData, setUserData] = useState<IpostData[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { user } = userStore()
  const navigate = useNavigate()

  const getUserData = async () => {
    try {
      if (!user) {
        toast.error("First Login")
        return navigate("/")
      }
      const response = await getAllPostsByMe()
      setUserData(response?.data)
    } catch (error) {

      console.log("getUserById Error: ", error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Container>
      <LeftSidebar />
      <section className="flex-1 border border-gray-600">
        <span className="p-3" />
        <div className="w-full inset-0 bg-[linear-gradient(45deg,#ffffff33_12%,transparent_12%,transparent_88%,#ffffff33_88%),linear-gradient(-45deg,#ffffff33_12%,transparent_12%,transparent_88%,#ffffff33_88%),linear-gradient(45deg,#ffffff33_12%,transparent_12%,transparent_88%,#ffffff33_88%),linear-gradient(-45deg,#ffffff33_12%,transparent_12%,transparent_88%,#ffffff33_88%)] bg-[size:40px_40px] bg-[position:0_0,0_0,20px_20px,20px_20px] mb-12">
          <img
            src={user?.profileImg}
            className="rounded-full translate-x-[50px] translate-y-[60px] border-[5px] border-black"
            alt="" width={120} height={120} />
          <button
            onClick={() => (setIsModal(!isModal))}
            className="float-right py-1 px-2 rounded-full border mr-8 hover:bg-slate-700">
            Edit Profile
          </button>
        </div>
        {isModal &&
          <Modal setIsModal={setIsModal}>
            <p>User Email: {user?.email}</p>
            <form action="">
              <label htmlFor="">
                Change Image
                <input type="file" />
              </label>
            </form>
          </Modal>}
        <h3 className="pt-7 pl-[32px] font-bold">{user?.email}</h3>
        <h3 className="pt-7 pl-[32px] font-mono text-xl">All my posts</h3>
        <MainContent postsData={userData} />
      </section>
      <RightSidebar />
    </Container>
  )
}

export default ProfilePage;