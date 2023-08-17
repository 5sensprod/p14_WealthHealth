import React from 'react'
import styles from './EmployeeForm.module.css'
import DatePicker from '../DatePicker'

const DateInputField = ({ name, value, label, onChange, error }) => (
  <div className={styles.label}>
    <p>{label}</p>
    <DatePicker
      startOfWeek="0"
      name={name}
      value={value}
      onChange={onChange}
      useIcons={true}
      language="en"
      dateFormat="DEFAULT"
      customStyles={{
        backgroundColor: 'transparent',
        borderRadius: '0',
      }}
      manualInputEnabled={true}
    />

    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)

export default DateInputField
