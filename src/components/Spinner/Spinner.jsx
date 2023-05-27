import React from 'react'
import { RiseLoader } from 'react-spinners'
import styles from '../../styles/Spinner.module.css'

const Spinner = () => {
    return (
        <div className={styles.loader}>
            <RiseLoader color="black" />
        </div>
    )
}

export default Spinner