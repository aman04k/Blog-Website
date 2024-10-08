// src/services/apiService.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:8000',
});

export const likePost = async (userId, postId) => {
  try {
    const response = await apiService.post('/like/new', { userId, postId });
    return response.data;
  } catch (error) {
    console.error('Error liking the post:', error);
    throw error;
  }
};

export const addComment = async (name, postId, date, comments) => {
  try {
    const response = await apiService.post('/comment/new', { name, postId, date, comments });
    return response.data;
  } catch (error) {
    console.error('Error adding the comment:', error);
    throw error;
  }
};
