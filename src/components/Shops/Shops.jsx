import React from 'react'
import { useSelector } from 'react-redux'
import Shop from './Shop'
import Spinner from '../Spinner/Spinner'
import styles from '../../styles/Shops.module.css'

const Shops = () => {

    const { list, isLoading, error } = useSelector(({ shops }) => shops)


    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Shops:</h2>
            {error && <p className='error'>{error}</p>}
            {isLoading && <Spinner />}
            <div className={styles.shops}>
                {list.map(({ _id, name }) => {
                    return (
                        <Shop name={name} id={_id} key={_id} />
                    )
                })}
            </div>
        </div>
    )
}

export default Shops