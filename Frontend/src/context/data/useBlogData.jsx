import { createContext, useState } from "react";

export const  blogContext = createContext();


export function BlogProvider({children}) {
  console.log("children",children)
  const [blogs, setBlogs] = useState([
    {
        _id: 1,
        title: "First Blog Post",
        content: "Nature is all around us, like trees, flowers, and animals. Trees give us oxygen to breathe and shade to play under. Flowers are beautiful and attract bees and butterflies",
        imageUrl: "https://th.bing.com/th/id/OIP.1d6tBbNiJTFQNEK_k0sSjQHaFj?rs=1&pid=ImgDetMain",
        likes: 0,
        comments: [],
        isEditing: false,
    },
    {
        _id: 2,
        title: "Second Blog Post",
        content: "Nature is all around us, like trees, flowers, and animals. Trees give us oxygen to breathe and shade to play under. Flowers are beautiful and attract bees and butterflies.",
        imageUrl: "https://th.bing.com/th/id/OIP.Z0PLkCGpEDNcan8n3m-OIAHaFk?rs=1&pid=ImgDetMain",
        likes: 0,
        comments: [],
        isEditing: false,
    },
    {
      _id: 3,
      title: " Mern Stack Page",
      content: "The MERN stack is a collection of technologies that help developers build robust and scalable web applications using JavaScript. The acronym “MERN” stands for MongoDB, Express, React, and Node. js, with each component playing a role in the development process.",
      imageUrl: "https://th.bing.com/th/id/OIP.Alaohgfx8zE1Wb5sQe7EKgHaDy?rs=1&pid=ImgDetMain",
      likes: 0,
      comments: [],
      isEditing: false,
  }
  ]);

  return <blogContext.Provider value={{blogs, setBlogs}}>{children}</blogContext.Provider>
}




