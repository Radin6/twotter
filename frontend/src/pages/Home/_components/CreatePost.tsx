import toast from "react-hot-toast";
import createPost from "@/services/posts/createPost.services";
import { useState } from "react"

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
      console.log("Error on submit createPost")
    }

  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target?.value
    setContent(newContent)
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
        {image && <img src={imagePreview} />}
        <textarea
          onChange={(e) => handleContentChange(e)}
          className="bg-transparent flex-1 max-h-[100px] p-3 m-3 border border-gray-700" name="" id=""
        />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-900 w-fit px-4 py-2 rounded-full">Post</button>
          <label htmlFor="actual-btn" className="bg-red-900 w-fit px-4 py-2 rounded-full">Choose Image</label>
          <input id="actual-btn" type="file" accept="image/png, image/jpeg" onChange={onChange} hidden />
        </div>
      </form>
    </div>
  )
}

export default CreatePost;