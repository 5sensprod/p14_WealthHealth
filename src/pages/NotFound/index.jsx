import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className={`${styles.main} ${styles.bgDark}`}>
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <br />
      <Link to="/" className={styles.homeLink}>
        Return to Home
      </Link>
    </div>
  </main>
)

export default NotFound
