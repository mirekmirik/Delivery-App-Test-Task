import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../features/cart/cartSlice'
import styles from '../../styles/Product.module.css'

const Product = (product) => {

    const dispatch = useDispatch()
    const { items } = useSelector(({ cart }) => cart)
    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
        if (items.length && items[0].shop !== product.shop) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [items, product])

    const addItemToCartHandler = () => {
        dispatch(addItemToCart(product))
    }


    return (
        <div className={styles.product} style={disabled ? { opacity: "0.3" } : {}}>
            <div className={styles.img}>
                <img src={`${product.img}`} alt="img" />
            </div>
            <p className={styles.name}>{product.name}</p>
            <span className={styles.price}>Price: {product.price} UAH</span>
            <div className={styles.button_wrapper}>
                <button className={styles.button} disabled={disabled} onClick={addItemToCartHandler}>Add to Cart</button>
            </div>
        </div >
    )
}

export default Product