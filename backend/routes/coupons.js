const express = require('express')
const Coupon = require('../models/couponModel')
const router = express.Router()



router.post('/createCoupon', async (req, res) => {
    try {
        const { description, code, discount, img } = req.body
        if (!description || !code || !discount || !img) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const coupon = new Coupon({
            img,
            description,
            code,
            discount
        })
        await coupon.save()
        return res.status(200).json({
            "success": 'coupon has been succesfully created!'
        })
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch!' });
    }
})


router.get('/', async (req, res) => {
    try {
        const coupons = await Coupon.find({})
        return res.status(200).json(coupons)
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch!' });
    }
})

module.exports = router