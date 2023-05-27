import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../../styles/Shop.module.css'

const Shop = ({ name, id }) => {

    

    return (

        <div className={styles.shop} key={id}>
            <NavLink to={`/shops/${id}/products`} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>{name}</NavLink>
        </div>

    )
}

export default Shop