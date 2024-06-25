import React, { useState } from 'react';
import { Button, Input, Typography } from "@material-tailwind/react";
import toast from 'react-hot-toast';

export default function ForgotPassword({ onClose }) {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (!email) {
            return toast.error("Email is required");
        }

        // Add your password reset logic here, such as an API call to send a reset link to the provided email
        // For demonstration purposes, we simulate sending the reset link
        // In real-world, replace this with actual API call
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 2000); // Simulating delay for API call
            }),
            {
                loading: 'Sending reset link...',
                success: 'Password reset link sent to your email',
                error: 'Failed to send reset link. Please try again later.',
            }
        );

        // Close the modal after the action
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <Typography variant="h5" className="mb-4">
                    Reset Password
                </Typography>
                <Input
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={handleResetPassword}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        Send Reset Link
                    </Button>
                    <Button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#FF5733',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
