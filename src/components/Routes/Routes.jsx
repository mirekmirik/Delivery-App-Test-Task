import React from 'react'
import Home from '../Home/Home'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import Cart from '../Cart/Cart'
import History from '../History/History'
import Coupons from '../Coupons/Coupons'

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.PRODUCTS_CATEGORY} element={<Home />} />
            <Route path={ROUTES.HISTORY} element={<History />} />
            <Route path={ROUTES.COUPONS} element={<Coupons />} />

        </Routes>
    )
}

export default AppRoutes