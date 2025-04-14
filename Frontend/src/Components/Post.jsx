// import React, { useState } from 'react'
// import "../Components/Styles/post.css"

// export const Post = ({post, userId, onLike, onComment}) => {
//     const [commentText, setCommentText] = useState('');
//     const [isCommenting, setIsCommenting] = useState(false);
//     const [commentError, setCommentError] = useState(null);
//     const [isLiking, setIsLiking] = useState(false);
//     const [likeError, setLikeError] = useState(null);
    
//     // Safely check if post is liked
//     const isLiked = post?.likes?.some(like => 
//        typeof like === 'object' ? like._id === userId : like === userId
//     ) || false;

//     // Safely get comments or default to empty array
//     const comments = Array.isArray(post?.comments) ? post.comments : [];

//     const handleComment = async () => {
//       if (!commentText.trim() || !post?._id) return;
      
//       setIsCommenting(true);
//       setCommentError(null);
//       try {
//         await onComment(post._id, commentText);
//         setCommentText('');
//       } catch (error) {
//         console.error('Comment error:', error);
//         setCommentError('Failed to post comment. Please try again.');
//       } finally {
//         setIsCommenting(false);
//       }
//     };

//     const handleLike = async () => {
//       if (!post?._id) return;
      
//       setIsLiking(true);
//       setLikeError(null);
//       try {
//         await onLike(post._id);
//       } catch (error) {
//         console.error('Like error:', error);
//         setLikeError('Failed to update like. Please try again.');
//       } finally {
//         setIsLiking(false);
//       }
//     };

//     return (
//         <div className="post">
//         {/* <div className="post-header">
//           <span className="post-user">{post.userId.name}</span>
//           <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
//         </div> */}
//         <div className="post-header">
//         <span className="post-user">
//           { post?.userName || post?.userId?.name || 'Anonymous User'}
//         </span>
//         <span className="post-time">
//           {post?.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
//         </span>
//       </div>
        
//         {/* <p className="post-content">{post.content}</p> */}
//         <p className="post-content">{post?.content || ''}</p>

//       {/* Like Button */}
//       <div className="post-actions">
//         <button 
//           className={`post-action-button ${isLiked ? 'liked' : ''}`}
//           onClick={handleLike}
//           disabled={!post?._id || isLiking}
//         >
//           {isLiking ? '...' : isLiked ? 'Liked' : 'Like'} 
//           ({post?.likes?.length || 0})
//         </button>
//         {likeError && <div className="post-error">{likeError}</div>}
//       </div>
//         {/* <div className="post-actions">
//           <button 
//             className={`post-action-button ${isLiked ? 'liked' : ''}`}
//             onClick={() => onLike(post._id)}
//           >
//             Like ({post.likes.length})
//           </button>
//         </div> */}
        
//         <div className="comment-section">
//           <div className="comment-input-container">
//             <input
//               type="text"
//               className="comment-input"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Write a comment..."
//               disabled={isCommenting}
//             />
//             <button className="comment-button" onClick={handleComment} disabled={!commentText.trim() || !post?._id || isCommenting}>
//               {isCommenting ? 'Posting...' : 'Post'}
//             </button>
//           </div>
//           {commentError && <div className="comment-error">{commentError}</div>}


//                   {/* Comments List */}
//         <div className="comment-list">
//           {comments.map((comment, index) => {
//             // Use comment._id if available, otherwise fallback to index
//             const commentKey = comment?._id || `comment-${index}`;
            
//             return (
//               <div key={commentKey} className="comment">
//                 <span className="comment-user">
//                   {comment?.userName || comment?.userId?.name || 'User'}:
//                 </span>
//                 <span className="comment-text">{comment?.text || ''}</span>
//                 {comment?.createdAt && (
//                   <span className="comment-time">
//                     {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//           {/* <div className="comment-list">
//           {comments.map((comment, index) => (
//             <div key={`${comment?._id || index}`} className="comment">
//               <span className="comment-user">
//                 { comment?.userName  || comment?.userId?.name || 'User'}:
//               </span>
//               <span className="comment-text">{comment?.text || ''}</span>
//             </div>
//           ))}
//         </div> */}
//           {/* <div className="comment-list">
//             {post.comments.map((comment, index) => (
//               <div key={index} className="comment">
//                 <span className="comment-user">{comment.userId.name}:</span>
//                 <span className="comment-text">{comment.text}</span>
//               </div>
//             ))}
//           </div> */}
//         </div>
//       </div>
//     )
// }

import React, { useState } from 'react';
import "../Components/Styles/post.css"
import { FaThumbsUp } from 'react-icons/fa';

export const Post = ({ post, userId, onLike, onUnlike, onComment }) => {
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);  

  // const isLiked = post?.likes?.includes(userId) || false;
  const isLiked = post?.likes?.some(like => 
    typeof like === 'object' 
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
      console.error('Like action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    
    setIsCommenting(true);
    try {
      await onComment(post._id, commentText);     // 188 line no.
      setCommentText('');
    } catch (error) {
      console.error('Comment error:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-user">
          {post?.userId?.name || 'User'}
        </span>
        <span className="post-time">
          {new Date(post?.createdAt).toLocaleString()}
        </span>
      </div>
      
      <p className="post-content">{post?.content}</p>

       {/* Add media display */}
      {post?.media && (
        <div className="post-media">
          {post.mediaType === 'image' ? (
            <img src={post.media} alt="Post media" />
          ) : (
            <video controls src={post.media} />
          )}
        </div>
      )}

      <div className="post-actions">
        <button 
          className={`post-action-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeAction}
          disabled={isProcessing}
        >
           <FaThumbsUp className="like-icon" />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
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
            {isCommenting ? 'Posting...' : 'Post'}
          </button>
        </div>

        <div className="comment-list">
          {post?.comments?.map((comment, index) => (
            <div key={index} className="comment">
              <span className="comment-user">
                {comment?.userName || 'User'}:
              </span>
              <span className="comment-text">{comment?.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
