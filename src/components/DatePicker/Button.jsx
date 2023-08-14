import React, { forwardRef } from 'react'
import styles from './Button.module.css' // Assurez-vous d'avoir le bon chemin pour le CSS

const Button = forwardRef(
  ({ onClick, children, icon: Icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`${styles.button} ${className ? className : ''}`}
        {...props}
      >
        {Icon && <Icon />}
        {children}
      </button>
    )
  },
)

export default Button
