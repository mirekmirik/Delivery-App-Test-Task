import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useSelector } from 'react-redux'
import styles from '../../styles/Header.module.css'


const Header = () => {

    const { items } = useSelector(({ cart }) => cart)


    const getNavLinkClassName = ({ isActive, isPending }) => {
        return isPending ? 'pending' : isActive ? 'active' : ''
    }

    return (
        <div className={styles.header}>
            <NavLink to={ROUTES.HOME} className={getNavLinkClassName}>Shop</NavLink>
            <div className={styles.vl}></div>
            <NavLink to={ROUTES.CART} className={getNavLinkClassName}>Shopping Cart</NavLink>
            {!items.length ? '' : <div className={styles.count}>
                {items.length}
            </div>}
            <div className={styles.vl}></div>
            <NavLink to={ROUTES.HISTORY} className={getNavLinkClassName}>History</NavLink>
            <div className={styles.vl}></div>
            <NavLink to={ROUTES.COUPONS} className={getNavLinkClassName}>Coupons</NavLink>

        </div>

    )
}

export default Header