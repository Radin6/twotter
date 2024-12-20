import Container from "@/components/Container";
import LeftSidebar from "@/components/LeftSidebar";
import userStore from "@/store/userStore";
import { IpostData } from "@/types/post"

import { useNavigate } from "react-router-dom";
import { MainContent } from "../Home/Home";
import getAllPostsByMe from "@/services/posts/getAllPostsByMe.services";
import { useEffect, useRef, useState } from "react";
import RightSidebar from "@/components/RightSidebar";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import updateUserMe from "@/services/users/updateUserMe.services";

function ProfilePage() {
  const { user, setUser } = userStore()
  const [userData, setUserData] = useState<IpostData[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState<string>(user?.username || "")

  const navigate = useNavigate()
  const imageRef = useRef<HTMLInputElement>(null);

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

  const handleInputClick = () => {
    imageRef?.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event?.target?.files?.[0];

    if (selectedImage) setImage(selectedImage)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()

    if (!(image instanceof File) && !username) return console.log("username and image are empty!!")

    if ((image instanceof File)) {
      formData.append("profileImage", image) // TODO change name to userImage
    }
    formData.append("username", username)

    console.log("Sending data Profile update: ")

    try {
      const response = await updateUserMe(formData)

      if (response.data.profileImage || response.data.username) {

        if (user !== null) {
          setUser({
            ...user,
            profileImg: response.data.profileImage ?? user.profileImg,
            email: user.email ?? '',
            username: response.data.username ?? user.username,
          });
        }

      }

      setTimeout(() => location.reload(), 1000)
      return toast.success("User updated successfully!")
    } catch (error) {
      toast.error("Failed to update user");
      console.log("Error in Profile.tsx: " + error)
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
            className="rounded-full translate-x-[50px] translate-y-[60px] border-[5px] border-black w-[120px] h-[120px] object-cover"
            alt="" width={120} height={120} />
          <button
            onClick={() => (setIsModal(!isModal))}
            className="float-right py-1 px-2 rounded-full border mr-8 hover:bg-slate-700">
            Edit Profile
          </button>
        </div>
        {isModal &&
          <Modal setIsModal={setIsModal}>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <p>Email: {user?.email}</p>
                <p>Username: { }</p> {/* // get current username */}
                <input
                  value={username}
                  className="bg-slate-500"
                  type="text"
                  onChange={(event) => setUsername(event?.target?.value)} />
                <Button
                  variant="outline"
                  className=""
                  type="button"
                  onClick={handleInputClick}>
                  Change Image
                </Button>
                <input
                  onChange={handleInputChange}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={imageRef} />
                {image && <img className="w-full h-auto max-w-[190px] max-h-[190px]" src={URL.createObjectURL(image)} />}
                <Button>Save</Button>
              </div>
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