const express = require('express')
const Product = require('../models/productModel')
const router = express.Router()


router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById({ id })
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/', async (req, res) => {
    try {
        const products= await Product.find({})
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})






router.post('/createProduct', async (req, res) => {
    try {
        const product = new Product({
            name: `Картопля Фрі маленька`,
            shop: '646fb5f0afac8f0950cb6cdd',
            price: 36,
            img: 'https://s7d1.scene7.com/is/image/mcdonalds/FFSmall:product-header-desktop?wid=830&hei=458&dpr=off'
        })

        await product.save()

        return res.status(200).json({
            "success": 'product has been succesfully created!'
        })
    } catch (err) {
        return res.status(500).json({
            "message": err.message
        })
    }
})

module.exports = router