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

export default function AdminLogin() {
    const context = useContext(myContext);
    const { mode } = context;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileData, setProfileData] = useState({
        name: '',
        birthdate: '',
        phone: '',
        profilePicture: null,
    });

    const login = async () => {
        if(!email || !password) {
            return toast.error("All fields are required")
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful")
            localStorage.setItem("admin", JSON.stringify(result));
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error("Login failed")
        }

    }

    const handleProfileChange = (e) => {
        const { name, value, files } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Handle profile update logic here
        toast.success("Profile updated successfully");
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
        <div className="flex flex-col items-center h-screen justify-evenly">
            {/* Login Section */}
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
                        Admin Login
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form className="flex flex-col gap-4">
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={login}
                            style={buttonStyle}
                        >
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>

            {/* Profile Edit Section */}
            <div style={{
                maxWidth: '500px',
                margin: '40px auto',
                padding: '20px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{ marginTop: 0 }}>Edit Profile</h1>
                <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlFor="profilePicture" style={{ marginBottom: '10px' }}>Profile Picture:</label>
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
                    <label htmlFor="name" style={{ marginBottom: '10px' }}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            width: '100%',
                            marginBottom: '10px'
                        }}
                    />
                    <label htmlFor="birthdate" style={{ marginBottom: '10px' }}>Birthdate:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={profileData.birthdate}
                        onChange={handleProfileChange}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            width: '100%',
                            marginBottom: '10px'
                        }}
                    />
                    <label htmlFor="phone" style={{ marginBottom: '10px' }}>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            width: '100%',
                            marginBottom: '10px'
                        }}
                    />
                    <label htmlFor="email" style={{ marginBottom: '10px' }}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            width: '100%',
                            marginBottom: '10px'
                        }}
                    />
                    <button
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
                    </button>
                </form>
            </div>
        </div>
    );
}
