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

    const login = async () => {
        // Example validation logic, replace with your actual login logic
        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        // Simulate successful login
        setIsLoggedIn(true);
        navigate('/profile'); // Redirect to profile page after login
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
                            />
                        ) : (
                            <Profile
                                setIsEditingProfile={setIsEditingProfile}
                                logout={() => setIsLoggedIn(false)}
                                textStyle={textStyle}
                                buttonStyle={buttonStyle}
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
                            textStyle={textStyle}
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

const LoginForm = ({ email, setEmail, password, setPassword, login, setIsForgotPasswordOpen, textStyle, buttonStyle }) => (
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
