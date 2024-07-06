import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://amanprajapati7266:7xH1cHTT8hf8x94l@cluster0.cqolvlp.mongodb.net/Blogwebsite`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database ", error);
  }
};

export default Connection;    
