const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Route to handle new order data
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;

    // Add the order date at the beginning of the data array
    data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        // Check if the email already exists in the database
        let eId = await Order.findOne({ email: req.body.email });
        console.log(eId);

        if (eId === null) {
            // Create a new order document if email doesn't exist
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            res.status(201).json({ success: true });
        } else {
            // Update the existing order document by adding new order data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.status(200).json({ success: true });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
});

// Route to fetch order data by email
router.post('/myorderData', async (req, res) => {
    try {
        const myData = await Order.findOne({ email: req.body.email });

        if (!myData) {
            return res.status(404).json({ error: "No orders found for this email." });
        }

        res.status(200).json({ orderData: myData });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
});


module.exports = router;
