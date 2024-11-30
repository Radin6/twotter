import { LikeButton, CommentButton } from "./ActionButtons";
import { Icomment, IpostData } from "../types/post";
import { useEffect, useState } from "react";
import CreateComment from "@/pages/Home/_components/CreateComment";

interface ICommentEmail extends Icomment {
  email: string
}

function PostCard({ postData }: { postData: IpostData }) {
  const [comments, setComments] = useState<ICommentEmail[]>([]);
  const [showCreateComment, setShowCreateComment] = useState(false);

  return (
    <div className="flex flex-row p-4 border rounded-md border-gray-600">
      <div className="min-w-[50px] mr-5">
        <img src={postData?.profile_img} className="rounded-full" alt="" width={50} height={50} />
      </div>
      <div className="w-full">
        <strong>{postData?.email}</strong>
        <img className="my-2" src={postData?.post_image} />
        <p className="text-[14px]">{postData?.content}</p>
        <p className="text-gray-400 font-mono text-[12px] text-right">{postData?.post_created_at?.slice(0, 10)}</p>
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