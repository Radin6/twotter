import { LikeButton, CommentButton } from "./ActionButtons";
import { IpostData } from "../types/post";

function PostCard({ postData }: { postData: IpostData }) {
  return (
    <div className="flex flex-row p-4 border rounded-md border-gray-500">
      <div className="min-w-[50px] mr-5">
        <img src={postData.profile_img} className="rounded-full" alt="" width={50} height={50} />
      </div>
      <div>
        <strong>{postData.email}</strong>
        <p>{postData.content}</p>
        <p className="text-gray-400 font-mono">{postData.post_created_at.slice(0,10)}</p>
        <div className="flex m-1 justify-around">
          <LikeButton likes={postData.post_likes} onLike={()=>{}} />
          <CommentButton />
        </div>
      </div>
    </div>
  )
}

export default PostCard;