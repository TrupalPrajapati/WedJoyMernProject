import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/Styles/createnewspost.css';

export const CreateNewsPost = () => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!content.trim()) return;
      const formData = new FormData();
      formData.append('content', content);
      formData.append('userId', userId);
      if (file) {
        formData.append('media', file);
      }
      setIsLoading(true);
      try {
        await axios.post('/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // await axios.post('/posts', { content, userId });
        navigate('/newspostfeed'); // Redirect to news feed after success
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="create-post-page">
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*,video/*"
          />
          <textarea
            className="post-content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in your community?"
            rows={8}
          />
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading || !content.trim()}
          >
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    );
}
