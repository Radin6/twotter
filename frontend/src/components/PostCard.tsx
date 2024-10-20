import { LikeButton, CommentButton } from "./ActionButtons";
import { Icomment, IpostData } from "../types/post";
import { useState } from "react";
import CreateComment from "@/pages/Home/_components/CreateComment";

function PostCard({ postData }: { postData: IpostData }) {
  const [comments, setComments] = useState<Icomment[] | null>(null);

  return (
    <div className="flex flex-row p-4 border rounded-md border-gray-500">
      <div className="min-w-[50px] mr-5">
        <img src={postData.profile_img} className="rounded-full" alt="" width={50} height={50} />
      </div>
      <div className="w-full">
        <strong>{postData.email}</strong>
        <p>{postData.content}</p>
        <p className="text-gray-400 font-mono">{postData.post_created_at.slice(0, 10)}</p>
        <div className="flex m-1 justify-around">
          <LikeButton likes={postData.post_likes} onLike={() => { }} />
          <CommentButton setComments={setComments} comments={comments} postId={postData.post_id} />
        </div>
        <div className="flex flex-col">
          {comments?.map((comment, index) =>
            <div key={comment.comment_id} className="p-3">
              <span>
                {comment.comment_content}
              </span>
              <p className="text-gray-400 font-mono">{comment.created_at.slice(0, 10)}</p>
            </div>
          )}
          {comments && <CreateComment postId={postData.post_id} setComments={setComments} comments={comments} />}
        </div>
      </div>
    </div>
  )
}

export default PostCard;