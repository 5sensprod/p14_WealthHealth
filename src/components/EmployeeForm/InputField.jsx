import React from 'react'
import styles from './EmployeeForm.module.css'

const InputField = ({ name, value, label, type = 'text', onChange, error }) => (
  <div className={styles.label}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)

export default InputField
