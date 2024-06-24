import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Sports', 'Technical', 'Travel', 'History'];

function AllBlogs() {
    const context = useContext(myContext);
    const { mode, getAllBlog } = context;
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        filterBlogs();
    }, [getAllBlog, selectedCategory]);

    const filterBlogs = () => {
        if (selectedCategory === 'All') {
            setFilteredBlogs(getAllBlog);
        } else {
            const filtered = getAllBlog.filter(blog => blog.category === selectedCategory);
            setFilteredBlogs(filtered);
        }
    };

    return (
        <Layout>
            <section className="text-gray-600 body-font" style={{ backgroundColor: '#FFA500' }}>
                <div className="container px-5 py-10 mx-auto max-w-7xl">
                    {/* Top Heading */}
                    <div className="mb-5 text-center">
                        <h1 className="text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                            All Blogs
                        </h1>
                        {/* Category Dropdown */}
                        <div className="mt-5">
                            <select
                                className="p-2 rounded"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{
                                    backgroundColor: '#FFF',
                                    color: '#000',
                                    borderColor: mode === 'dark' ? '#E2E8F0' : '#1E293B'
                                }}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="flex flex-wrap justify-center -m-4 mb-5">
                        {/* Blog Cards */}
                        {filteredBlogs && filteredBlogs.length > 0 ? (
                            filteredBlogs.map((item, index) => {
                                const { thumbnail, date, id, title, description, category } = item;
                                return (
                                    <div key={index} className="p-4 md:w-1/3">
                                        <div
                                            onClick={() => navigate(`/bloginfo/${id}`)}
                                            style={{
                                                background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white',
                                                borderBottom: mode === 'dark' ? '4px solid rgb(226, 232, 240)' : '4px solid rgb(30, 41, 59)'
                                            }}
                                            className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                                                ${mode === 'dark' ? 'shadow-gray-700' : 'shadow-xl'} rounded-xl overflow-hidden`}
                                        >
                                            {/* Blog Thumbnail */}
                                            <img className="w-full" src={thumbnail} alt="blog" />

                                            {/* Top Items */}
                                            <div className="p-6">
                                                {/* Blog Date */}
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                                    style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}>
                                                    {date}
                                                </h2>

                                                {/* Blog Title */}
                                                <h1 className="title-font text-lg font-bold text-gray-900 mb-3"
                                                    style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}>
                                                    {title}
                                                </h1>

                                                {/* Blog Description */}
                                                <p className="leading-relaxed mb-3"
                                                    style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}>
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex justify-center items-center w-full h-64">
                                <h1 className="text-2xl text-gray-500">No blogs found.</h1>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default AllBlogs;
