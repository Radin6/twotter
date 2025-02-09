import toast from "react-hot-toast";
import createPost from "@/services/posts/createPost.services";
import { useState } from "react"
import { X } from 'lucide-react';
import Button from "@/components/Button";

function CreatePost() {
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null); // Store the file itself
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!content.length) {
      return toast.error("Content is empty")
    }

    const formData = new FormData()
    formData.append("content", content)

    if (image) {
      formData.append("postImage", image)
    }

    try {
      const response = await createPost(formData);
      setTimeout(() => location.reload(), 1000)
      return toast.success("Post created successfully!")

    } catch (error) {
      toast.error("Failed to create post.");
      console.log("Error on submit createPost:", error)
    }

  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target?.value
    setContent(newContent)
  }

  const handleResetImage = () => {
    setImage(null)
    setImagePreview("")
  }

  const onChange = (event: any) => {
    event.preventDefault()
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file)
      setImagePreview(imageUrl);
    }
  }

  return (
    <div className="border rounded-md border-gray-500 flex-1 m-8">
      <form className="flex flex-col m-3" onSubmit={event => handleSubmit(event)}>
        {image &&
          <div className="relative">
            <X className="absolute rounded-full bg-slate-400/50 hover:bg-red-300/50 right-1 top-1 cursor-pointer" onClick={handleResetImage}/>
            <img src={imagePreview} />
          </div>}
        <textarea
          onChange={(e) => handleContentChange(e)}
          className="bg-transparent flex-1 max-h-[100px] p-3 m-3 border border-gray-700" name="" id=""
        />
        <div className="flex justify-between">
          <Button type="submit">Post</Button>
          <label htmlFor="actual-btn" className="cursor-pointer p-2 px-3 border rounded-full text-[#1d9bf0] bg-transparent hover:bg-slate-700 transition duration-30 ease-in-out w-fit">Choose Image</label>
          <input id="actual-btn" type="file" accept="image/png, image/jpeg" onChange={onChange} hidden />
        </div>
      </form>
    </div>
  )
}

export default CreatePost;