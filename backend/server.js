const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productRouter = require('./routes/products')
const shopRouter = require('./routes/shops')
const orderRouter = require('./routes/orders')
const couponRouter = require('./routes/coupons')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const PORT = 8080


mongoose.connect(process.env.MONGODB_URL)


app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))


app.use('/products', productRouter)

app.use('/shops', shopRouter)

app.use('/orders', orderRouter)

app.use('/coupons', couponRouter)