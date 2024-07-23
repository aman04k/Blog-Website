import React, { useState } from 'react';

const Post = ({ post, likePost, addComment }) => {
  const [comment, setComment] = useState('');

  const handleLike = () => {
    likePost(post.timestamp);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(post.timestamp, comment);
    setComment('');
  };

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.file && (
        <div>
          <h4>Attached File:</h4>
          <img
            src={URL.createObjectURL(post.file)}
            alt={post.file.name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
      <p>{post.timestamp.toLocaleString()}</p>
      <div>
        <button onClick={handleLike}>Like ({post.likes})</button>
      </div>
      <div>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Comment</button>
        </form>
      </div>
      <div>
        <h4>Comments:</h4>
        {post.comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default Post;
