import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import "../Components/Styles/postfeed.css"

export const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem('id');

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await axios.post('/posts/like', { postId, userId });
      // Update the specific post in state
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  const unlikePost = async (postId) => {
    try {
      const response = await axios.post('/posts/unlike', { postId, userId });
      // Update the specific post in state
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const addComment = async (postId, text) => {
    try {
      // Get username from localStorage or use default
      const userName = localStorage.getItem('userName') || 'User';
      
      // Post comment with available data
      const { data: updatedPost } = await axios.post('/posts/comment', { 
        postId, 
        userId,
        userName, // Use the username we have
        text 
      });
      
      // Update the specific post in state
      setPosts(posts.map(post => 
        post._id === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-feed animate-fadeInUp">
      <h1 className="feed-title">Community News Feed</h1>
      
      {posts.length === 0 ? (
        <p className="no-posts">No posts yet. Be the first to share!</p>
      ) : (
        <div className='posts-list'>
          {posts.map(post => (
          <Post
            key={post._id}
            post={post}
            userId={userId}
            onLike={likePost}
            onComment={addComment}
            onUnlike={unlikePost} 
          />
        ))}
        </div>
      )}
    </div>
  );
};
