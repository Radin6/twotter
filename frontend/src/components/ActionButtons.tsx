import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt, FaRegCommentAlt } from "react-icons/fa";

interface LikeButton {
  likes: number;
  onLike: () => void;
}

export function LikeButton({likes, onLike}: LikeButton) {
  return (
    <button 
      onClick={() => onLike()}
      className="flex items-center gap-1 p-1 rounded-md hover:bg-red-200/30">
      <span>{likes ? <FaHeart/> : <CiHeart/>}</span>
      <span>{likes}</span>  
    </button>
  )
}

export function CommentButton({comments=0}) {
  return (
    <button className="flex items-center gap-1 p-1 rounded-md hover:bg-blue-200/30">
      <span>{comments ? <FaCommentAlt/> : <FaRegCommentAlt/>}</span>
      <span>{comments}</span>  
    </button>
  )
}