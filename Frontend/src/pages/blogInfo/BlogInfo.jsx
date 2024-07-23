import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogInfo = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      console.log("Fetched blog:", response.data);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      console.log("Fetched comments:", response.data);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  const imageUrl = `https://via.placeholder.com/800?text=Image+${id}`;

  return (
    <div className="blog-info-container">
      {/* <img
        src={imageUrl}
        alt={`Image for blog ${id}`}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/800?text=Image+Not+Found";
        }}
      /> */}

      <img
        src={imageUrl}
        alt={`Image for blog ${id}`} // Alt text for accessibility
        className="w-full h-64 object-cover" // Styling for width, height, and object fit
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if placeholder fails
          e.target.src = "https://via.placeholder.com/800?text=Image+Not+Found"; // Placeholder image
        }}
      />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
        <p className="leading-relaxed mb-6">{blog.body}</p>

        <div>
          <h2 className="text-2xl font-bold mb-3">Comments</h2>
          {comments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <h3 className="font-semibold">{comment.name}</h3>
                <p>{comment.body}</p>
                <p className="text-sm text-gray-600">By {comment.email}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;
