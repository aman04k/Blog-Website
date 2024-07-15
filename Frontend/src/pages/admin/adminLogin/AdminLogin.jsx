import React, { useState, useEffect } from "react";
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
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null); // State to store user profile data

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserProfile();
        }
    }, [isLoggedIn]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('https://api.example.com/user/profile', {
                method: 'GET',
                headers: {
                    // Add any necessary headers here, such as authentication tokens
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            const data = await response.json();
            setUserProfile(data); // Store profile data in state
        } catch (error) {
            console.error('Error fetching user profile:', error.message);
            toast.error('Failed to fetch user profile');
        }
    };

    const login = async () => {
        // Example validation logic, replace with your actual login logic
        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        // Simulate successful login
        setIsLoggedIn(true);
        navigate('/'); // Redirect to home page after login
    };

    const cardStyle = {
        background: isLoggedIn ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
    };

    const headerStyle = {
        background: isLoggedIn ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
    };

    const textStyle = {
        color: isLoggedIn ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
    };

    const buttonStyle = {
        background: isLoggedIn ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
        color: isLoggedIn ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {isForgotPasswordOpen && <ForgotPassword onClose={() => setIsForgotPasswordOpen(false)} />}
            <Card className="w-full max-w-[24rem]" style={cardStyle}>
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
                        {isLoggedIn ? (isEditingProfile ? "Edit Profile" : "Profile Page") : "User Login"}
                    </Typography>
                </CardHeader>
                <CardBody>
                    {isLoggedIn ? (
                        isEditingProfile ? (
                            <ProfileEdit
                                setIsEditingProfile={setIsEditingProfile}
                                textStyle={textStyle}
                                buttonStyle={buttonStyle}
                                userProfile={userProfile}
                            />
                        ) : (
                            <Profile
                                setIsEditingProfile={setIsEditingProfile}
                                logout={() => setIsLoggedIn(false)}
                                textStyle={textStyle}
                                buttonStyle={buttonStyle}
                                userProfile={userProfile}
                            />
                        )
                    ) : (
                        <LoginForm
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            login={login}
                            setIsForgotPasswordOpen={setIsForgotPasswordOpen}
                            buttonStyle={buttonStyle}
                        />
                    )}
                    {!isLoggedIn && (
                        <div className="flex justify-between mt-4">
                            <Link to="/" className="text-blue-500 hover:text-blue-700">
                                Home
                            </Link>
                            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}

const LoginForm = ({ email, setEmail, password, setPassword, login, setIsForgotPasswordOpen, buttonStyle }) => (
    <form className="flex flex-col gap-4">
        <div>
            <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-[-5px]"  // Apply Tailwind CSS margin-top of -5px
            />
        </div>
        <div>
            <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <Button onClick={login} style={buttonStyle}>
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
);
