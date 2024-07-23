import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css'; // Import your CSS file

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', file);

    try {
      // POST request to the demo API
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add the new post to the local state
      addPost({
        ...response.data,
        file, // Attach the file object (for display purposes)
        timestamp: new Date(), // Adding timestamp to the post
        likes: 0,
        comments: [],
      });

      // Clear the form
      setTitle('');
      setContent('');
      setFile(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="create-post-card">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Attach File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
