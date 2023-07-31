import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <div>
      <Link className={styles.mainNavItem} to="/">
        <i className="fa fa-sign-out"></i>
        <span className={styles.mainNavItemText}> Inscription</span>
      </Link>
      <Link className={styles.mainNavItem} to="/employees-list">
        <i className="fa fa-user-circle"></i>
        <span className={styles.mainNavItemText}>Employees list</span>
      </Link>
    </div>
  )
}

export default Navigation
