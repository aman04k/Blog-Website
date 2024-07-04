import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const singupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { username: request.body.username, email: request.body.email, password: hashedPassword }

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(400).json({ msg: 'Email does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });

        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}


export const logoutUser = async (request, response) => {
    try {
        const token = request.body.token;
        if (!token) {
            return response.status(400).json({ msg: 'Token is required' });
        }

        const result = await Token.deleteOne({ token: token });

        if (result.deletedCount === 0) {
            return response.status(404).json({ msg: 'Token not found' });
        }

        return response.status(204).json({ msg: 'Logout successful' });
    } catch (error) {
        console.error('Error while logging out user:', error);
        return response.status(500).json({ msg: 'Error while logging out user' });
    }
};


export const forgotPassword = async (request, response) => {
    try {
        let user = await User.findOne({ email: request.body.email });
        if (!user) {
            return response.status(400).json({ msg: 'Email does not exist' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);
        const expirationTime = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = expirationTime;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nithyaa.work@gmail.com',
                pass: 'adms yfps pihg azje'
            }
        });

        const mailOptions = {
            to: user.email,
            from: 'nithyaa.work@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${request.headers.host}/reset-password/${resetToken}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        return response.status(200).json({ msg: 'Password reset link sent to email' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while sending reset password email' });
    }
};

export const resetPassword = async (request, response) => {
    try {
        const { token, password, confirmPassword } = request.body;
        if (password !== confirmPassword) {
            return response.status(400).json({ msg: 'Passwords do not match' });
        }

        const user = await User.findOne({
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return response.status(400).json({ msg: 'Password reset token is invalid or has expired' });
        }

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isTokenValid) {
            return response.status(400).json({ msg: 'Password reset token is invalid or has expired' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = process.env.ACCESS_SECRET_KEY;
        user.resetPasswordExpires = undefined;
        await user.save();

        return response.status(200).json({ msg: 'Password reset successful' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while resetting password' });
    }
};
