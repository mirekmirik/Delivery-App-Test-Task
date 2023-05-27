const express = require('express')
const Shop = require('../models/shopModel')
const Product = require('../models/productModel')
const router = express.Router()



router.get('/', async (req, res) => {
    try {
        const shops = await Shop.find({})
        res.status(200).json(shops)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.get('/:shopId/products', async (req, res) => {
    const { shopId } = req.params
    try {
        const products = await Product.find({
            shop: shopId
        })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




router.post('/createShop', async (req, res) => {
    try {
        const shop = new Shop({
            name: 'Пузата Хата'
        })

        await shop.save()

        return res.status(200).json({
            "success": 'shop has been succesfully created!'
        })
    } catch (err) {
        return res.status(500).json({
            "message": err.message
        })
    }
})


module.exports = router