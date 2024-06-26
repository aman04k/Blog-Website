import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

// Default profile icon URL
const defaultProfileIcon = 'https://example.com/default-profile-icon.png';

export default function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        birthdate: '',
        phone: '',
        email: '',
        profilePicture: null,
    });

    useEffect(() => {
        const storedProfileData = JSON.parse(localStorage.getItem("profileData"));
        if (storedProfileData) {
            setProfileData(storedProfileData);
        }
    }, []);

    const editProfile = () => {
        navigate('/profileedit');
    };

    const goToHome = () => {
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem("profileData"); // Remove profile data from localStorage
        localStorage.removeItem("admin"); // Remove admin authentication data
        navigate('/adminlogin'); // Navigate to the admin login page
    };

    const headerStyle = {
        background: '#4CAF50',
        color: '#fff',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#fff',
        color: '#4CAF50',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    };

    const profileContainerStyle = {
        width: '100%',
        height: 'calc(100vh - 60px)', // Adjust the height to fill the screen minus the header height
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#f9f9f9',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };

    const profileImageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        width: '150px',
        height: '150px',
        border: '2px solid black',
        borderRadius: '50%',
        overflow: 'hidden',
    };

    const profileImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const detailStyle = {
        width: '100%',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#fff',
        marginBottom: '10px',
        textAlign: 'left',
        fontSize: '1.2rem',
    };

    return (
        <div style={{ minHeight: '100vh', background: '#e0f7fa', padding: '20px' }}>
            <div style={headerStyle}>
                <div style={titleStyle}>Profile</div>
                <div>
                    <Button
                        onClick={goToHome}
                        style={buttonStyle}
                    >
                        Home
                    </Button>
                    <Button
                        onClick={logout}
                        style={{ ...buttonStyle, marginLeft: '10px' }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <div style={profileContainerStyle}>
                <div style={profileImageContainerStyle}>
                    {profileData.profilePicture ? (
                        <img
                            src={profileData.profilePicture instanceof File ? URL.createObjectURL(profileData.profilePicture) : profileData.profilePicture}
                            alt="Profile"
                            style={profileImageStyle}
                        />
                    ) : (
                        <img
                            src={defaultProfileIcon}
                            alt="Default Profile Icon"
                            style={profileImageStyle}
                        />
                    )}
                </div>
                <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Profile Details</Typography>
                <div style={detailStyle}><strong>First Name:</strong> {profileData.firstName}</div>
                <div style={detailStyle}><strong>Last Name:</strong> {profileData.lastName}</div>
                <div style={detailStyle}><strong>Birthdate:</strong> {profileData.birthdate}</div>
                <div style={detailStyle}><strong>Phone:</strong> {profileData.phone}</div>
                <div style={detailStyle}><strong>Email:</strong> {profileData.email}</div>
                <Button
                    onClick={editProfile}
                    style={{ ...buttonStyle, backgroundColor: '#4CAF50', color: '#fff', marginTop: '20px' }}
                >
                    Edit Profile
                </Button>
            </div>
        </div>
    );
}
