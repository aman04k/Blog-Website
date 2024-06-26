import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signup = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return toast.error("All fields are required");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        const profileData = {
            firstName,
            lastName,
            email,
            profilePicture: null,
        };

        localStorage.setItem("profileData", JSON.stringify(profileData));
        toast.success("Signup successful");

        navigate('/profile');
    };

    const goToAdminLogin = () => {
        navigate('/adminlogin');
    };

    const handleGoogleSignup = () => {
        toast.success("Google Signup successful");
        navigate('/profile');
    };

    const goToHome = () => {
        navigate('/');
    };

    const cardStyle = {
        background: '#dcdcdc',
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '600px',
    };

    const headerStyle = {
        background: '#1d2951',
        color: 'white',
    };

    const textStyle = {
        color: '#333',
    };

    const buttonStyle = {
        background: '#007BFF',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    };

    const homeButtonStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: '#FF5722',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div className="flex justify-center items-center h-screen relative" style={{ backgroundColor: 'white' }}>
            <Button
                onClick={goToHome}
                style={homeButtonStyle}
            >
                Home
            </Button>
            <Card style={cardStyle}>
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={headerStyle}
                >
                    <Typography variant="h4" style={{ color: 'white' }}>
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form className="flex flex-col gap-4">
                        <div>
                            <Input
                                type="text"
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                size="lg"
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                size="lg"
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                size="lg"
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                size="lg"
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                size="lg"
                            />
                        </div>
                        <Button onClick={signup} style={buttonStyle}>
                            Sign Up
                        </Button>
                        <Button
                            onClick={goToAdminLogin}
                            style={{ ...buttonStyle, backgroundColor: '#4CAF50' }} // Green background
                        >
                            Admin Login
                        </Button>
                        <Button
                            onClick={handleGoogleSignup}
                            style={{ ...buttonStyle, backgroundColor: '#DB4437' }} // Google red background
                        >
                            Sign Up with Google
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
