import React from 'react'
import styles from '../../styles/History.module.css'
import HistoryForm from './HistoryForm'
import HistoryOrders from './HistoryOrders'

const History = () => {
    return (
        <div className={styles.wrapper}>
            <HistoryForm />
            <HistoryOrders />
        </div>
    )
}

export default History