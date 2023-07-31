import React from 'react'
import styles from './Footer.module.css'

/**
 * A component that represents the footer of the application.
 * It displays a copyright notice for Wealth Health.
 *
 * @component
 * @returns {React.ReactNode} The rendered footer with the copyright notice.
 */

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.footerText}>Copyright 2020 Wealth Health</p>
  </footer>
)

export default Footer
