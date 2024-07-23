import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ["All", "Sports", "Technical", "Travel", "History"];

const AllBlogs = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState(posts);

  useEffect(() => {
    filterBlogs();
  }, [posts, selectedCategory]);

  const filterBlogs = () => {
    if (selectedCategory === "All") {
      setFilteredBlogs(posts);
    } else {
      const filtered = posts.filter((blog) => blog.category === selectedCategory);
      setFilteredBlogs(filtered);
    }
  };

  const navigate = useNavigate();

  return (
    <section className="text-gray-600 body-font" style={{ backgroundColor: "#FFA500" }}>
      <div className="container px-5 py-10 mx-auto max-w-7xl">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold" style={{ color: "black" }}>
            All Blogs
          </h1>
          {/* Category Dropdown */}
          <div className="mt-5">
            <select
              className="p-2 rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                backgroundColor: "#FFF",
                color: "#000",
                borderColor: "#1E293B",
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
        <div className="flex flex-wrap justify-center -m-4 mb-5">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => {
              const { id, title, body } = item;
              return (
                <div key={id} className="p-4 md:w-1/3">
                  <div
                    onClick={() => navigate(`/bloginfo/${id}`)}
                    style={{
                      background: "white",
                      borderBottom: "4px solid rgb(30, 41, 59)",
                    }}
                    className="h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 rounded-xl overflow-hidden"
                  >
                    <img
                      src={`https://via.placeholder.com/300?text=Image+${id}`} // Placeholder image
                      alt={`Image for blog ${id}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {/* For demo, we'll just display a placeholder date */}
                        2024-07-23
                      </h2>
                      <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
                        {title}
                      </h1>
                      <p className="leading-relaxed mb-3">
                        {body}
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
  );
};

export default AllBlogs;
