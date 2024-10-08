import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { baseUrl } from "../../../../config";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState(""); // Changed state variable name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = async () => {
    if (!firstName || !email || !password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (!email.endsWith("@gmail.com")) {
      return toast.error("Please enter a valid Gmail address");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const profileData = {
      username: userName, // Use userName for profileData
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const res = await response.json();
      console.log('response', res); // Log the response object to console

      if (response.ok) {
        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(profileData));

        toast.success("Signup successful");
        navigate("/adminlogin"); // Navigate to login page after successful signup
      } else {
        toast.error(res.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during signup");
    }
  };

  const handleGoogleSignup = () => {
    toast.success("Google Signup successful");
    navigate("/"); // Navigate to home page after Google signup
  };

  const cardStyle = {
    background: "#dcdcdc",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    width: "100%", // Adjusted width to 100% for full-width
    maxWidth: "800px", // Increased maxWidth for larger box
    position: "relative", // Add relative positioning for the card
    padding: "20px", // Added padding for better spacing inside the card
    margin: "20px", // Added margin for spacing from the edges
  };

  const headerStyle = {
    background: "#1d2951",
    color: "white",
    padding: "15px", // Added padding to header for better appearance
  };

  const buttonStyle = {
    background: "#007BFF",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    marginRight: "10px", // Added margin-right to buttons for spacing
  };

  const homeLinkStyle = {
    position: "absolute",
    bottom: "5px", // Adjust bottom positioning as needed
    left: "15px", // Align to the right side of the card
    color: "#007BFF", // Blue color
    textDecoration: "None", // Underline effect
    cursor: "pointer", // Pointer cursor for interaction
    fontSize: "1.2rem", // Larger font size
    padding: "8px 12px", // Padding around the text
  };

  const goToAdminLoginStyle = {
    position: "absolute",
    bottom: "5px", // Adjust bottom positioning as needed
    right: "15px", // Align to the right side of the card
    color: "#007BFF", // Blue color
    textDecoration: "None", // Underline effect
    cursor: "pointer", // Pointer cursor for interaction
    fontSize: "1.2rem", // Larger font size
    padding: "8px 12px", // Padding around the text
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundColor: "white" }}
    >
      <Card style={cardStyle}>
        <CardHeader
          color="blue"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          style={headerStyle}
        >
          <Typography variant="h4" style={{ color: "white" }}>
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                First Name<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                size="lg"
              />
            </div> 
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                User Name<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your user name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} // Changed setLastName to setUserName
                size="lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Gmail<span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter your Gmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password<span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                placeholder="Enter your confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="lg"
              />
            </div>
            <Button onClick={signup} style={buttonStyle}>
              Sign Up
            </Button>
            <Button
              onClick={handleGoogleSignup}
              style={{ ...buttonStyle, backgroundColor: "#DB4437" }} // Google red background
            >
              Sign Up with Google
            </Button>
          </form>
          <Link to="/" style={homeLinkStyle}>
            Home
          </Link>
          <Link to="/adminlogin" style={goToAdminLoginStyle}>
            Login
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
