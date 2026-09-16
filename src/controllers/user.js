import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        
        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res
            .status(400)
            .json({ status: "false", message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
            .status(400)
            .json({ status: "false", message: "Email already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({...req.body, password: hashedPassword });

        return res.status(201).json({ status: "true", message: "User registered successfully", user: {firstName, lastName, email, phoneNumber} });

    } catch (error) {
        return res.status(400).json({ status: "false", message: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            return res
            .status(400)
            .json({ status: "false", message: "Email and Password Required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "false", message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "false", message: "Invalid credentials" });
        }

        return res.status(200).json({ status: "true", message: "Login successful", user: { firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber } });
    } catch (error) {
        return res.status(400).json({ status: "false", message: error.message });
    }
};