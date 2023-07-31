import React from 'react'
import Logo from '../Logo'
import Navigation from '../Navigation'
import styles from './Header.module.css'

/**
 * A component that represents the main header of the application.
 * It incorporates the application's logo and primary navigation.
 *
 * @component
 * @returns {React.ReactNode} The rendered header containing the logo and primary navigation.
 */

const Header = () => {
  return (
    <nav className={styles.mainNav}>
      <Logo />
      <Navigation />
    </nav>
  )
}

export default Header
