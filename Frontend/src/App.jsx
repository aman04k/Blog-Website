import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import AllBlogs from './pages/allBlogs/AllBlogs';
import NoPage from './pages/nopage/NoPage';
import BlogInfo from './pages/blogInfo/BlogInfo';
import AdminLogin from './pages/admin/adminLogin/AdminLogin';
import Profile from './pages/admin/adminLogin/Profile';
import ProfileEdit from './pages/admin/adminLogin/ProfileEdit';
import ForgotPassword from './pages/admin/adminLogin/ForgotPassword';
import Signup from './pages/admin/adminLogin/Signup';
import Dashboard from './pages/admin/dashboard/Dashboard';
import CreateBlog from './pages/admin/createBlog/CreateBlog';
import CreatePost from './components/createPost/CreatePost';
import MyState from './context/data/myState';
import { Toaster } from 'react-hot-toast';
import { BlogProvider } from './context/data/useBlogData';
import axios from 'axios';
import './App.css';

// Protected Route for Admin
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  if (admin?.user?.email === 'aman@gmail.com') {
    return children;
  } else {
    return <Navigate to={'/adminlogin'} />;
  }
};

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add a new post
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <MyState>
      <BlogProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/allblogs" element={<AllBlogs posts={posts} />} />
            <Route path="/bloginfo/:id" element={<BlogInfo />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileedit" element={<ProfileEdit />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/createpost" element={<CreatePost addPost={addPost} />} />
            <Route path="/dashboard" element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/createblog" element={
              <ProtectedRouteForAdmin>
                <CreateBlog />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <Toaster />
        </Router>
      </BlogProvider>
    </MyState>
  );
}

export default App;
