import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'bookstore-secret';

router.post('/register', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({ message: 'Name, email and password are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(409).json({ message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        return response.status(201).json({
            message: 'User created successfully',
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ message: error.message });
    }
});

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(401).json({ message: 'Invalid email or password.' });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return response.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return response.json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ message: error.message });
    }
});

export default router;
