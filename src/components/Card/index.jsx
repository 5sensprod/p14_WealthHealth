import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ icon, linkTo, text }) => {
  return (
    <Link to={linkTo} className={styles.cardLink}>
      <div className={styles.card}>
        <i className={`fa ${icon}`}></i>
        <span className={styles.mainNavItemText}>{text}</span>
      </div>
    </Link>
  )
}

export default Card
