import { LikeButton, CommentButton } from "./ActionButtons";
import { Icomment, IpostData } from "../types/post";
import { useEffect, useState } from "react";
import CreateComment from "@/pages/Home/_components/CreateComment";
import formatTime from "@/utils/formatTime";

interface ICommentEmail extends Icomment {
  email: string
}

function PostCard({ postData }: { postData: IpostData }) {
  const [comments, setComments] = useState<ICommentEmail[]>([]);
  const [showCreateComment, setShowCreateComment] = useState(false);
  console.log(postData)
  
  return (
    <div className="flex flex-row p-2 border rounded-md border-gray-600">
      <div className="min-w-[50px] mr-5">
        <img src={postData?.profile_img} className="rounded-full" alt="" width={50} height={50} />
      </div>
      <div className="w-full">
        <div className="">
          <strong>{postData?.username || postData?.email}</strong>
          <span className="text-gray-500 tex-sm"> · {formatTime(postData?.post_created_at)}</span>
        </div>
        <img className="my-2 rounded-lg" src={postData?.post_image} />
        <p className="text-[14px]">{postData?.content}</p>
        
        <div className="flex m-1 justify-around">
          <LikeButton likes={postData?.post_likes} onLike={() => { }} />
          <CommentButton 
            toggleShowCreateComment={() => setShowCreateComment((prev) => !prev)}
            setComments={setComments} 
            comments={comments} 
            postId={postData?.post_id} />
        </div>
        <div className="flex flex-col">
          {(comments.length > 0) && comments?.map((comment, index) =>
            <div key={comment.comment_id} className="p-3">
              <p>{comment.email}</p>
              <span className="text-[14px]">
                {comment.comment_content}
              </span>
              <p className="text-gray-400 font-mono text-[12px] text-right">{comment.created_at.slice(0, 10)}</p>
            </div>
          )}
          {showCreateComment && <CreateComment postId={postData.post_id} setComments={setComments} comments={comments} />}
        </div>
      </div>
    </div>
  )
}

export default PostCard;