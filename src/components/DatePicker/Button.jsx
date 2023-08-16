import React, { forwardRef } from 'react'
import styles from './Button.module.css'

const Button = forwardRef(
  ({ onClick, children, icon: Icon, className, ...props }, ref) => {
    const handleClick = (event) => {
      event.stopPropagation()
      if (onClick) onClick(event)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
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
