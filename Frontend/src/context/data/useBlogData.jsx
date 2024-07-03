import { createContext, useState } from "react";

export const  blogContext = createContext();


export function BlogProvider({children}) {
  const [blogs, setBlogs] = useState([
    {
        _id: 1,
        title: "First Blog Post",
        content: "This is the content of the first blog post.",
        imageUrl: "https://th.bing.com/th/id/OIP.1d6tBbNiJTFQNEK_k0sSjQHaFj?rs=1&pid=ImgDetMain",
        likes: 0,
        comments: [],
        isEditing: false,
    },
    {
        _id: 2,
        title: "Second Blog Post",
        content: "This is the content of the second blog post.",
        imageUrl: "https://th.bing.com/th/id/OIP.Z0PLkCGpEDNcan8n3m-OIAHaFk?rs=1&pid=ImgDetMain",
        likes: 0,
        comments: [],
        isEditing: false,
    },
    {
      _id: 3,
      title: " MERN STACK PAGE",
      content: "This is the content of the second blog post.",
      imageUrl: "https://th.bing.com/th/id/OIP.Alaohgfx8zE1Wb5sQe7EKgHaDy?rs=1&pid=ImgDetMain",
      likes: 0,
      comments: [],
      isEditing: false,
  }
  ]);

  return <blogContext.Provider value={{blogs, setBlogs}}>{children}</blogContext.Provider>
}




