import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-health.jpg'
import styles from './Logo.module.css'

/**
 * Logo component for Wealth Health. When clicked, it redirects users
 * to the homepage. The component displays the Wealth Health Logo
 * as an image and has an associated hidden text for accessibility.
 *
 * @component
 * @returns {React.ReactNode} The rendered Wealth Health Logo with a link to the homepage.
 */

const Logo = () => {
  return (
    <Link className={styles.mainNavLogo} to="/">
      <img
        className={styles.mainNavLogoImage}
        src={logo}
        alt="Wealth Health Logo"
      />
      <h1 className={styles.srOnly}>Wealth Health</h1>
    </Link>
  )
}

export default Logo
