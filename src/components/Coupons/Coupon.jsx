import React, { useRef, useState } from 'react'
import styles from '../../styles/Coupon.module.css'
const Coupon = (coupon) => {

    const inputRef = useRef(null)
    const [isCopy, setIsCopy] = useState(false)

    const copyToClipboard = async () => {
        if (inputRef.current) {
            try {
                await navigator.clipboard.writeText(coupon.code)
                setIsCopy(true)
            } catch (err) {
                setIsCopy(false)
                console.error(`Failed to copy to clipboard`, err)
            }

        }
    };

    return (
        <div className={styles.coupon}>
            <div className={styles.content}>
                <img className={styles.img} src={coupon.img} alt={coupon.description} />
                <p className={styles.title}>{coupon.description}</p>
                <span ref={inputRef}>{coupon.code}</span>
                <button className={styles.button} onClick={copyToClipboard}>Copy</button>
                {isCopy && <span className='success'>You have succesfully added to clipboard this code!</span>}
            </div>
        </div>
    )
}

export default Coupon