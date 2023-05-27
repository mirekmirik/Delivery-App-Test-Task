import React from 'react'
import styles from '../../styles/CartItem.module.css'
import { useDispatch } from 'react-redux'
import { addItemToCart, deleteItemFromCart } from '../../features/cart/cartSlice'
const CartItem = (item) => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(addItemToCart({ ...item, quantity: event.target.value }))
    }

    const deleteItem = (event) => {
        event.preventDefault()
        dispatch(deleteItemFromCart(item._id))
    }

    return (
        <div className={styles.item}>
            <img src={item.img} alt={item.title} />
            <div className={styles.info}>
                <p className={styles.title}>{item.name}</p>
                <span className={styles.price}>Price: {item.price * item.quantity} UAH</span>
                <div className={styles.controllers}>
                    <input className={styles.quantity} type="number" id="tentacles" name="tentacles"
                        min="1" defaultValue={item.quantity} onChange={handleChange} />
                    <button className={styles.close} onClick={deleteItem}>X</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem