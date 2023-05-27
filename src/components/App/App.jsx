import Header from "../Header/Header";
import AppRoutes from "../Routes/Routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "../../features/shops/shopsSlice";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../features/products/productsSlice";
import { getCoupons } from "../../features/coupons/couponsSlice";
import { getCartDataFromLocalStorage } from "../../features/cart/cartSlice";
import styles from '../../styles/App.module.css'

function App() {

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const { list } = useSelector(({ shops }) => shops)

  useEffect(() => {
    if (!list.length) {
      dispatch(getShops())
    }
    if (pathname === '/') {
      dispatch(getProducts())
    }
    dispatch(getCoupons())
    dispatch(getCartDataFromLocalStorage())
  }, [dispatch, pathname])




  return (
    <div id="app" className={`${styles.app}`}>
      <Header />
      <div className={styles.container}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;

