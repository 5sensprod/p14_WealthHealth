import React from 'react'
import styles from './EmployeeForm.module.css'

const InputField = ({ name, value, label, type = 'text', onChange, error }) => (
  <label className={styles.label}>
    <p>{label}</p>
    <input type={type} name={name} value={value} onChange={onChange} />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </label>
)

export default InputField
