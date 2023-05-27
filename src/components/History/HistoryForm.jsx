import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getOrdersByUser } from '../../features/orders/ordersSlice'
import styles from '../../styles/HistoryForm.module.css'

const HistoryForm = () => {

    const defaultValues = {
        email: '',
        phone: '',
        id: ''
    }

    const [values, setValues] = useState(defaultValues)
    const dispatch = useDispatch()

    const handleChange = ({ target: { value, name } }) => {
        setValues((prevState) => ({ ...prevState, [name]: value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getOrdersByUser(values))
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>Email</label>
            <input name='email' type='text' placeholder='Type your email...' onChange={handleChange} />
            <label>Phone</label>
            <input name='phone' type='text' placeholder='Type your phone...' onChange={handleChange} />
            <label>Order ID</label>
            <input name='id' type='text' placeholder='Type your Order ID...' onChange={handleChange} />
            <button className={styles.submit}>Submit</button>
        </form>
    )
}

export default HistoryForm