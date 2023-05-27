const express = require('express')
const Order = require('../models/orderModel')
const router = express.Router()




router.post('/createOrder', async (req, res) => {
    try {
        const { items, name, email, phone, address, totalPrice } = req.body

        if (!items.length) {
            return res.status(400).json({ message: 'You didnt choose anything in the store!..' });

        }

        if (!name || !phone || !address || !totalPrice) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const order = new Order({
            items,
            totalPrice,
            name,
            email,
            phone,
            address,
        });

        await order.save()

        res.status(200).json({
            message: 'You have successfully created a product!'
        })
    } catch (err) {
        console.error('Error creating order: ', err)
        res.status(500).json({ error: 'Failed to create order!' })
    }

})
router.post('/getOrders', async (req, res) => {
    try {
        const { email, phone, id } = req.body;

        if (!email && !phone && !id) {
            return res.status(400).json({ message: "Fields are required!" });
        }

        let query = {};

        if (email) {
            query.email = email;
        } else if (phone) {
            query.phone = phone;
        } else if (id) {
            query._id = id;
        } else {
            return res.status(400).json({ message: "Invalid field provided!" });
        }

        const orders = await Order.find(query);

        if (!orders || orders.length === 0) {
            return res.status(400).json({ message: "No orders found!" });
        }

        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch orders!' });
    }
});




module.exports = router