import React, { useState } from "react";
import "../Components/Styles/post.css";
import { FaThumbsUp } from "react-icons/fa";

export const Post = ({ post, userId, onLike, onUnlike, onComment }) => {
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // const isLiked = post?.likes?.includes(userId) || false;
  const isLiked = post?.likes?.some((like) =>
    typeof like === "object"
      ? like._id.toString() === userId.toString()
      : like.toString() === userId.toString()
  );

  const handleLikeAction = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      if (isLiked) {
        await onUnlike(post._id);
      } else {
        await onLike(post._id);
      }
    } catch (error) {
      console.error("Like action failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    setIsCommenting(true);
    try {
      await onComment(post._id, commentText); // 188 line no.
      setCommentText("");
    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="post-container animate-fadeInUp">
      <div className="post">
        <div className="post-header">
          <span className="post-user">{post?.userId?.name || "User"}</span>
          <span className="post-time">
            {new Date(post?.createdAt).toLocaleString()}
          </span>
        </div>

        <p className="post-content">{post?.content}</p>

        {/* Add media display */}
        {post?.media && (
          <div className="post-media">
            {post.mediaType === "image" ? (
              <img src={post.media} alt="Post media" />
            ) : (
              <video controls src={post.media} />
            )}
          </div>
        )}

        <div className="post-actions">
          <button
            className={`post-action-button ${isLiked ? "liked" : ""}`}
            onClick={handleLikeAction}
            disabled={isProcessing}
          >
            <FaThumbsUp className="like-icon" />
            <span>{isLiked ? "Liked" : "Like"}</span>
            {post?.likes?.length > 0 && (
              <span className="like-count">{post.likes.length}</span>
            )}
          </button>
        </div>

        <div className="comment-section">
          <div className="comment-input-container">
            <input
              type="text"
              className="comment-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              disabled={isCommenting}
            />
            <button
              className="comment-button"
              onClick={handleComment}
              disabled={!commentText.trim() || isCommenting}
            >
              {isCommenting ? "Posting..." : "Post"}
            </button>
          </div>

          <div className="comment-list">
            {post?.comments?.map((comment, index) => (
              <div key={index} className="comment">
                <span className="comment-user">
                  {comment?.userName || "User"}:
                </span>
                <span className="comment-text">{comment?.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
