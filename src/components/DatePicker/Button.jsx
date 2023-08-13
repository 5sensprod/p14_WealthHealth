import React from 'react'
import styles from './Button.module.css'

function Button({ onClick, children, icon: Icon, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className ? className : ''}`}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </button>
  )
}

export default Button
