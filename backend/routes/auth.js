const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, phone, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        // decript the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
        });

        // Generate a JWT
        const token = jwt.sign(
            { userId: user.id, userEmail: user.email },
            process.env.SECRET_KEY, // Secret key
            { expiresIn: '24h' } // Token expiration time
        );

        //send the token and the data to regester
        return res.status(201).json({ message: 'Registraion successful', user: user, token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT
        const token = jwt.sign(
            { userId: user.id, userEmail: user.email },
            process.env.SECRET_KEY, // Secret key
            { expiresIn: '24h' } // Token expiration time
        );

        return res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
