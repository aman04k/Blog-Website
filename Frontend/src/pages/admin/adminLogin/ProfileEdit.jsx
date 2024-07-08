import React, { useState, useEffect } from 'react';
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { baseUrl } from '../../../../config'; // Replace with your actual base URL

// Default profile icon URL
const defaultProfileIcon = 'https://example.com/default-profile-icon.png';

export default function ProfileEdit() {
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

    const handleProfileChange = (e) => {
        const { name, value, files } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('firstName', profileData.firstName);
            formData.append('lastName', profileData.lastName);
            formData.append('birthdate', profileData.birthdate);
            formData.append('phone', profileData.phone);
            formData.append('email', profileData.email);
            formData.append('profilePicture', profileData.profilePicture);

            const response = await fetch(`${baseUrl}/api/profile`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to save profile');
            }

            toast.success('Profile updated successfully');
            navigate('/profile'); // Navigate back to profile page after saving
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Failed to save profile');
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9',
    };

    const inputStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '10px',
        width: '100%',
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        cursor: 'pointer',
        marginTop: '10px'
    };

    const cancelButtonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#FF5733',
        color: '#fff',
        cursor: 'pointer',
        marginTop: '10px'
    };

    const profileImageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    };

    const profileImageStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid black', // Thin black border
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    };

    return (
        <form onSubmit={handleProfileSubmit} style={formStyle}>
            <div style={headerStyle}>Profile Edit</div>
            <div style={profileImageContainerStyle}>
                <img
                    src={profileData.profilePicture ?
                        (profileData.profilePicture instanceof File ? URL.createObjectURL(profileData.profilePicture) : profileData.profilePicture) :
                        defaultProfileIcon}
                    alt="Profile"
                    style={profileImageStyle}
                />
            </div>
            <div>
                <label>Profile Picture:</label>
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleProfileChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <Input
                    type="text"
                    label="First Name"
                    placeholder='Enter your name'
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <Input
                    type="text"
                    label="Last Name"
                    placeholder='Enter your last name'
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <Input
                    type="date"
                    label="Birthdate"
                    name="birthdate"
                    value={profileData.birthdate}
                    onChange={handleProfileChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <Input
                    type="tel"
                    label="Phone"
                    placeholder='Enter your phone number'
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <Input
                    type="email"
                    label="Email"
                    placeholder='Enter your email'
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    style={inputStyle}
                />
            </div>
            <Button
                type="submit"
                style={buttonStyle}
            >
                Save Changes
            </Button>
            <Button
                onClick={() => navigate('/profile')}
                style={cancelButtonStyle}
            >
                Cancel
            </Button>
        </form>
    );
}
