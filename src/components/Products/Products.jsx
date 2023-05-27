import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductsByShop } from '../../features/products/productsSlice'
import Spinner from '../Spinner/Spinner'
import styles from '../../styles/Products.module.css'

const Products = () => {


    const { products, isLoading, error } = useSelector(({ products }) => products)
    const { shopId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (shopId) {
            dispatch(getProductsByShop(shopId))
        }
    }, [dispatch, shopId])

    return (
        <div className={styles.products}>
            {error && <p className='error'>{error}</p>}
            {isLoading && <Spinner />}
            {products.map((product) => {
                return (
                    <Product {...product} key={product._id} />
                )
            })}
        </div>
    )
}

export default Products