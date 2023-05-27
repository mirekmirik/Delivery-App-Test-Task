import React, { useEffect, useState } from 'react'
import CartData from './CartData'
import CartUserForm from './CartUserForm'
import { useSelector } from 'react-redux';

const Cart = () => {

    const [totalPrice, setTotalPrice] = useState(0);
    
    const { items } = useSelector(({ cart }) => cart)
    const { findCoupon } = useSelector(({ coupons }) => coupons)

    useEffect(() => {
        const calculateTotalPrice = (items, discount) => {
            const sumOfEveryItem = items.map(({ quantity, price }) => quantity * price);
            const totalSum = sumOfEveryItem.reduce((acc, val) => acc + val, 0);
            if (discount) {
                const total = totalSum * (1 - discount / 100);
                return total.toFixed(2);
            }
            return totalSum.toFixed(2);
        };

        setTotalPrice(calculateTotalPrice(items, findCoupon?.discount));
    }, [items, findCoupon]);


    return (
        <>
            <CartUserForm totalPrice={totalPrice} />
            <CartData totalPrice={totalPrice} items={items} />
        </>
    )
}

export default Cart