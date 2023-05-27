import React, { useEffect } from 'react'
import styles from '../../styles/HistoryOrders.module.css'
import { useDispatch, useSelector } from 'react-redux'
import HistoryOrder from './HistoryOrder'
import Spinner from '../Spinner/Spinner'
import { resetError } from '../../features/orders/ordersSlice'


const HistoryOrders = () => {
    const dispatch = useDispatch()
    const { historyOrders, error, isLoading } = useSelector(({ orders }) => orders)


    useEffect(() => {
        return () => dispatch(resetError())
    }, [dispatch])

    return (
        <div className={styles.history}>
            <p className={styles.title}>History</p>
            {error && <p className='error'>{error}</p>}
            {isLoading && <Spinner />}
            {historyOrders?.map((orders) => {
                return (
                    <div className={styles.orders}>
                        {orders?.items?.map((item) => {
                            return (
                                <HistoryOrder key={item._id} {...item} />
                            )
                        })}
                        <div className={styles.total}>Total Price: {orders.totalPrice} UAH</div>
                    </div>
                )
            })}
        </div>
    )

}

export default HistoryOrders