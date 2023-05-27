import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, resetError } from '../../features/orders/ordersSlice'
import styles from '../../styles/CartUserForm.module.css'
import Spinner from '../Spinner/Spinner'

const CartUserForm = ({ totalPrice }) => {

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    address: ''
  }

  const dispatch = useDispatch()

  const { items } = useSelector(({ cart }) => cart)
  const { isLoading, error, success } = useSelector(({ orders }) => orders)

  const [values, setValues] = useState(defaultValues)



  useEffect(() => {
    return () => dispatch(resetError())
  }, [dispatch])


  const handleChange = ({ target: { value, name } }) => {
    setValues((prevState) => ({ ...prevState, [name]: value }))
  }


  const payload = {
    items,
    totalPrice: totalPrice,
    name: values.name,
    phone: values.phone,
    address: values.address,
  };

  const submitOrderHandler = (event) => {
    event.preventDefault()
    dispatch(createOrder(payload))
    setValues(defaultValues)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitOrderHandler}>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
        {isLoading && <Spinner />}
        <label >Name:</label>
        <input name='name' type='text' onChange={handleChange} value={values.name}></input>
        <label >Email:</label>
        <input name='email' type='text' onChange={handleChange} value={values.email}></input>
        <label >Phone:</label>
        <input name='phone' type='text' onChange={handleChange} value={values.phone}></input>
        <label >Address:</label>
        <input name='address' type='text' onChange={handleChange} value={values.address}></input>
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  )
}

export default CartUserForm