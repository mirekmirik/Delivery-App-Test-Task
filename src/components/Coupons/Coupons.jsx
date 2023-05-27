import React from 'react'
import Coupon from './Coupon'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import styles from '../../styles/Coupons.module.css'



const Coupons = () => {
    const { coupons, error, isLoading } = useSelector(({ coupons }) => coupons)


    return (
        <div className={styles.wrapper}>
            {error && <p className='error'>{error}</p>}
            {isLoading && <Spinner />}
            {coupons.map((coupon) => {
                return (
                    <Coupon key={coupon._id} {...coupon} />
                )
            })}

        </div>
    )
}

export default Coupons