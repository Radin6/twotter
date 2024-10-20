import commentByPostId from "@/services/posts/commentByPostId.services";
import { Icomment } from "@/types/post";
import { useState } from "react";
import toast from "react-hot-toast";

interface CreateComment {
  postId: number
  comments: Icomment[]
  setComments: React.Dispatch<React.SetStateAction<any>>
}

function CreateComment({ postId, setComments, comments }: CreateComment) {
  const [comment, setComment] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (comment.length) {
      const response = await commentByPostId({ comment, postId });

      const { commentId, createdAt, content } = response.data;

      const newComment: Icomment = {
        comment_id: commentId, 
        post_id: postId, 
        user_id: 1, 
        comment_content: comment,
        comment_likes: 0, 
        created_at: createdAt
      };

      if (comments.length > 0) {
        setComments([...comments, newComment])
      } else {
        setComments(newComment)
      }
      
      return toast.success("Comment created successfully!")
    }

    return toast.error("Content is empty")
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target?.value
    console.log(newContent)
    setComment(newContent)
  }

  return (
    <div className="border rounded-md border-gray-500 flex-1 m-1 w-full">
      <form className="flex flex-col m-3" onSubmit={event => handleSubmit(event)}>
        <textarea
          onChange={(e) => handleContentChange(e)}
          className="bg-transparent flex-1 max-h-[100px] p-3 m-3 text-sm" name="" id=""
        />
        <button type="submit" className="bg-blue-900 w-fit px-4 py-2 rounded-full">Comment</button>
      </form>
    </div>
  )
}

export default CreateComment;