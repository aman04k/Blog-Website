import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import ForgotPassword from "./ForgotPassword"; // Import the ForgotPassword component

export default function AdminLogin() {
    const context = useContext(myContext);
    const { mode } = context;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        birthdate: '',
        phone: '',
        email: '',
        profilePicture: null,
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // Forgot Password modal state

    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Dummy login function
    const login = async () => {
        if (!email || !password) {
            return toast.error("All fields are required");
        }

        if (!validateEmail(email)) {
            return toast.error("Invalid email format");
        }

        try {
            // Simulate fetching user data from an API
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                birthdate: '1990-01-01',
                phone: '1234567890',
                email,
                profilePicture: null,
            };

            // Save user data in localStorage
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("profileData", JSON.stringify(userData));

            setIsLoggedIn(true);
            setProfileData(userData);

            toast.success("Login successful");
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("profileData");
        setIsLoggedIn(false);
        setProfileData({
            firstName: '',
            lastName: '',
            birthdate: '',
            phone: '',
            email: '',
            profilePicture: null,
        });
        toast.success("Logout successful");
        navigate('/');
    };

    // Handle profile change
    const handleProfileChange = (e) => {
        const { name, value, files } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    // Handle profile form submission
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("profileData", JSON.stringify(profileData));
        setIsEditingProfile(false);
        toast.success("Profile updated successfully");
    };

    // Effect to check login status on component mount
    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        if (loggedInStatus === "true") {
            setIsLoggedIn(true);
            const storedProfileData = JSON.parse(localStorage.getItem("profileData"));
            if (storedProfileData) {
                setProfileData(storedProfileData);
            }
        } else {
            setIsLoggedIn(false);
        }

        window.scrollTo(0, 0);
    }, []);

    const cardStyle = {
        background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
    };

    const headerStyle = {
        background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
    };

    const textStyle = {
        color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
    };

    const buttonStyle = {
        background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
        color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {isForgotPasswordOpen && (
                <ForgotPassword onClose={() => setIsForgotPasswordOpen(false)} />
            )}
            <Card
                className="w-full max-w-[24rem]"
                style={cardStyle}
            >
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={headerStyle}
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        <div className=" flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-20 w-20" alt="Admin Icon" />
                        </div>
                    </div>
                    <Typography variant="h4" style={textStyle}>
                        {isEditingProfile ? "Edit Profile" : isLoggedIn ? "Profile Page" : "Admin Login"}
                    </Typography>
                </CardHeader>
                <CardBody>
                    {isLoggedIn ? (
                        isEditingProfile ? (
                            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label>Profile Picture:</label>
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        onChange={handleProfileChange}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        label="First Name"
                                        name="firstName"
                                        value={profileData.firstName}
                                        onChange={handleProfileChange}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        label="Last Name"
                                        name="lastName"
                                        value={profileData.lastName}
                                        onChange={handleProfileChange}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="date"
                                        label="Birthdate"
                                        name="birthdate"
                                        value={profileData.birthdate}
                                        onChange={handleProfileChange}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="tel"
                                        label="Phone"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleProfileChange}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    style={{
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        backgroundColor: '#4CAF50',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        marginBottom: '10px'
                                    }}
                                >
                                    Update Profile
                                </Button>
                                <Button
                                    onClick={() => setIsEditingProfile(false)}
                                    style={buttonStyle}
                                >
                                    Back to Profile
                                </Button>
                            </form>
                        ) : (
                            <div>
                                <Typography variant="body1" style={textStyle}>
                                    First Name: {profileData.firstName}
                                </Typography>
                                <Typography variant="body1" style={textStyle}>
                                    Last Name: {profileData.lastName}
                                </Typography>
                                <Typography variant="body1" style={textStyle}>
                                    Birthdate: {profileData.birthdate}
                                </Typography>
                                <Typography variant="body1" style={textStyle}>
                                    Phone: {profileData.phone}
                                </Typography>
                                <Typography variant="body1" style={textStyle}>
                                    Email: {profileData.email}
                                </Typography>
                                <Button
                                    onClick={() => setIsEditingProfile(true)}
                                    style={buttonStyle}
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    onClick={logout}
                                    style={{
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        backgroundColor: '#FF5733',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        marginTop: '10px'
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        )
                    ) : (
                        <form className="flex flex-col gap-4">
                            <div>
                                <Input
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                onClick={login}
                                style={buttonStyle}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => setIsForgotPasswordOpen(true)}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    marginTop: '10px'
                                }}
                            >
                                Forgot Password
                            </Button>
                        </form>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
