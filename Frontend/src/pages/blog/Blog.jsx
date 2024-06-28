import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { AiOutlineLike, AiOutlineComment, AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";

const Blog = () => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "First Blog Post",
            content: "This is the content of the first blog post.",
            imageUrl: "https://th.bing.com/th/id/OIP.1d6tBbNiJTFQNEK_k0sSjQHaFj?rs=1&pid=ImgDetMain",
            likes: 0,
            comments: [],
            isEditing: false,
        },
        {
            id: 2,
            title: "Second Blog Post",
            content: "This is the content of the second blog post.",
            imageUrl: "https://th.bing.com/th/id/OIP.Alaohgfx8zE1Wb5sQe7EKgHaDy?rs=1&pid=ImgDetMain",
            likes: 0,
            comments: [],
            isEditing: false,
        }
    ]);

    const [newBlog, setNewBlog] = useState({ title: "", content: "", imageUrl: "" });
    const [showNewBlogForm, setShowNewBlogForm] = useState(false);

    const handleLike = (id) => {
        setBlogs(blogs.map(blog => blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog));
    };

    const handleAddComment = (id, comment) => {
        setBlogs(blogs.map(blog => blog.id === id ? { ...blog, comments: [...blog.comments, comment] } : blog));
    };

    const handleCreateBlog = () => {
        if (newBlog.title && newBlog.content && newBlog.imageUrl) {
            setBlogs([...blogs, { ...newBlog, id: Date.now(), likes: 0, comments: [], isEditing: false }]);
            setNewBlog({ title: "", content: "", imageUrl: "" });
            setShowNewBlogForm(false);
        }
    };

    const handleEditBlog = (id, updatedBlog) => {
        setBlogs(blogs.map(blog => blog.id === id ? { ...updatedBlog, isEditing: false } : blog));
    };

    const toggleEdit = (id) => {
        setBlogs(blogs.map(blog => blog.id === id ? { ...blog, isEditing: !blog.isEditing } : blog));
    };

    return (
        <div className="min-h-screen bg-orange-500 p-4">
            <div className="flex justify-end mb-8">
                <IconButton style={{ color: '#3B82F6' }} onClick={() => setShowNewBlogForm(!showNewBlogForm)}>
                    <AiOutlinePlus size={24} />
                </IconButton>
            </div>

            {showNewBlogForm && (
                <Card className="mb-4">
                    <CardHeader className="text-center">Create New Blog</CardHeader>
                    <CardBody>
                        <div className="mb-4">
                            <Input
                                type="text"
                                label="Title"
                                value={newBlog.title}
                                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="text"
                                label="Content"
                                value={newBlog.content}
                                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="text"
                                label="Image URL"
                                value={newBlog.imageUrl}
                                onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })}
                            />
                        </div>
                        <Button onClick={handleCreateBlog}>Create Blog</Button>
                    </CardBody>
                </Card>
            )}

            {blogs.map((blog) => (
                <Card key={blog.id} className="mb-4">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            {blog.isEditing ? (
                                <Input
                                    type="text"
                                    label="Title"
                                    value={blog.title}
                                    onChange={(e) => handleEditBlog(blog.id, { ...blog, title: e.target.value })}
                                />
                            ) : (
                                <Typography variant="h5">{blog.title}</Typography>
                            )}
                            <IconButton onClick={() => toggleEdit(blog.id)}>
                                <AiOutlineEdit size={24} />
                            </IconButton>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {blog.isEditing ? (
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    label="Image URL"
                                    value={blog.imageUrl}
                                    onChange={(e) => handleEditBlog(blog.id, { ...blog, imageUrl: e.target.value })}
                                />
                                <Input
                                    type="text"
                                    label="Content"
                                    value={blog.content}
                                    onChange={(e) => handleEditBlog(blog.id, { ...blog, content: e.target.value })}
                                />
                            </div>
                        ) : (
                            <>
                                <img src={blog.imageUrl} alt={blog.title} className="mb-4" />
                                <Typography>{blog.content}</Typography>
                            </>
                        )}
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                                <IconButton onClick={() => handleLike(blog.id)}>
                                    <AiOutlineLike size={24} />
                                </IconButton>
                                <Typography className="ml-2">{blog.likes} Likes</Typography>
                            </div>
                            <div className="flex items-center">
                                <AiOutlineComment size={24} />
                                <Typography className="ml-2">{blog.comments.length} Comments</Typography>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Input
                                type="text"
                                label="Add a comment"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.target.value) {
                                        handleAddComment(blog.id, e.target.value);
                                        e.target.value = "";
                                    }
                                }}
                            />
                            <div className="mt-2">
                                {blog.comments.map((comment, index) => (
                                    <Typography key={index} className="mb-2">{comment}</Typography>
                                ))}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default Blog;
