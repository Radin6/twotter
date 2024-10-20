import getCommentsByPostId from "@/services/posts/getCommentsByPostId.services";
import { Icomment } from "@/types/post";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt, FaRegCommentAlt } from "react-icons/fa";

interface LikeButton {
  likes: number;
  onLike: () => void;
}

export function LikeButton({ likes, onLike }: LikeButton) {
  return (
    <button
      onClick={() => onLike()}
      className="flex items-center gap-1 p-1 rounded-md hover:bg-red-200/30">
      <span>{likes ? <FaHeart /> : <CiHeart />}</span>
      <span>{likes}</span>
    </button>
  )
}

interface CommentButton {
  comments: Icomment[] | null, 
  setComments: React.Dispatch<any>, 
  postId: number
}

export function CommentButton({ comments, setComments, postId }: CommentButton) {
  const handleComment = async () => {
    if (comments) {
      return setComments(null);
    }
    const response = await getCommentsByPostId({postId});
    console.log(response.data);

    setComments(response.data);

  }

  return (
    <button className="flex items-center gap-1 p-1 rounded-md hover:bg-blue-200/30" onClick={handleComment}>
      <span>{comments ? <FaCommentAlt /> : <FaRegCommentAlt />}</span>
    </button>
  )
}