import getCommentsByPostId from "@/services/posts/getCommentsByPostId.services";
import { Icomment } from "@/types/post";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt, FaRegCommentAlt } from "react-icons/fa";

interface LikeButton {
  likes: number;
  likedByMe: boolean
  onLike: () => void;
}

export function LikeButton({ likes, onLike, likedByMe }: LikeButton) {
  return (
    <button
      onClick={() => onLike()}
      className="flex items-center gap-1 p-1 rounded-md hover:bg-red-200/30">
      <span>{likedByMe ? <FaHeart /> : <CiHeart />}</span>
      <span>{likes}</span>
    </button>
  )
}

interface CommentButton {
  comments: Icomment[], 
  setComments: React.Dispatch<any>, 
  toggleShowCreateComment: () => void,
  postId: number
}

export function CommentButton({ toggleShowCreateComment, comments, setComments, postId }: CommentButton) {
  const handleComment = async () => {
    toggleShowCreateComment();
    if (comments.length > 0) {
      return setComments([]);
    }

    try {
      const response = await getCommentsByPostId({ postId });
      setComments(response.data);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }

  }

  return (
    <button className="flex items-center gap-1 p-1 rounded-md hover:bg-blue-200/30" onClick={handleComment}>
      <span>{comments.length > 0 ? <FaCommentAlt /> : <FaRegCommentAlt />}</span>
    </button>
  )
}