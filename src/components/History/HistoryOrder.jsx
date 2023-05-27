import React from 'react'
import styles from '../../styles/HistoryOrder.module.css'

const HistoryOrder = (item) => {
    return (
        <div className={styles.order}>
            <img src={item.img} alt='img' />
            <div className={styles.info}>
                <p>{item.name}</p>
                <span>Quantity: {item.quantity}</span>
                <div className={styles.price}>Price: {item.price} X {item.quantity} UAH</div>
            </div>
        </div>
    )
}

export default HistoryOrder