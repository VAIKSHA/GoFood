const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();      // Router object creating
const jwt = require("jsonwebtoken")
const jwtSecret = "MyNameIsVishalKumarSharmaIamAYoutuber"

// POST route for user login
router.post('/loginuser', async (req, res) => {
    const { email, password } = req.body;

    try {
        // checking email & password is entered or not
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required!" });
        }

        // if user exists
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                error: "Email not registered!"
            });
        }

        // Password verification
        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                error: "Incorrect Password!"
            });
        }

        // data for jwt payload
        const data = {
            user: {
                id: userData.id
            }
        }

        // generating jwt
        const authToken = jwt.sign(data, jwtSecret)

        return res.json({
            success: true,
            message: "Login successfully!",
            authToken:authToken
        })
    }

    catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            error: "Internal sever error!"
        })
    }
});

module.exports = router;
