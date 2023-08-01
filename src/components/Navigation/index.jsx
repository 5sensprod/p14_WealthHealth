import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <div>
      <Link className={styles.mainNavItem} to="/add-employee">
        <i className="fa fa-pencil"></i>
        <span className={styles.mainNavItemText}>Create</span>
      </Link>
      <Link className={styles.mainNavItem} to="/employees-list">
        <i className="fa fa-search"></i>
        <span className={styles.mainNavItemText}>View</span>
      </Link>
    </div>
  )
}

export default Navigation
