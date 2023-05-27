import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { applyCoupon, deleteCoupon } from '../../features/coupons/couponsSlice'
import styles from '../../styles/CartData.module.css'

const CartData = ({ totalPrice, items }) => {

    const { error } = useSelector(({ coupons }) => coupons)
    const dispatch = useDispatch()


    const [value, setValue] = useState('')


    useEffect(() => {
        return () => dispatch(deleteCoupon())
    }, [dispatch])


    const onChangeCoupon = (event) => {
        setValue(event.target.value)
    }

    const confirmDiscount = () => {
        dispatch(applyCoupon(value))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.items}>
                {!items.length && <p>You havent added products! Please add something :)</p>}
                {items.map((item) => {
                    return (
                        <CartItem key={item._id} {...item} />
                    )
                })}
            </div>
            {items.length ?
                <div className={styles.total}>
                    <div className={styles.coupon}>
                        <p className={styles.coupon_title}>Coupon:</p>
                        {error && <p className='error'>{error}</p>}
                        <input name='coupon' type='text' className={styles.input} onChange={onChangeCoupon} value={value} />
                        <button className={styles.confirm} onClick={confirmDiscount}>Apply</button>
                    </div>
                    <div className={styles.submit}>
                    <p className={styles.total_price}>Total Price: {totalPrice} UAH</p>

                    </div>
                </div> : ''}
        </div>
    )
}

export default CartData