const express = require('express')
const router = express.Router()    // Creating a router object
const { check, validationResult } = require('express-validator');  // to validate request data
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// route define to handle HTTP POST requests for creating new user
router.post('/createuser',
    [   // Middlewares
        check('name', 'Name must be at least 4 characters').isLength(4),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('location', 'Location is required').not().isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array() 
            });
        }

        try {
            // Destructuring the request body to extract the user data for clear code
            const { name, email, password, location } = req.body;

            // Check if the user already exists
            const existingUser = await User.findOne({ email })
            // Password Hashing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if (existingUser) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Email is already registered' 
                });
            }

            // Create a new user
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                location,
            }).then(res.json({
                success:true
            }))
        } 
        catch (err) {
            console.error(err.message);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });

module.exports = router;