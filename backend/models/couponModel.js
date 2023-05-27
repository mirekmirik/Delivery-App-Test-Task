const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
})

const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon