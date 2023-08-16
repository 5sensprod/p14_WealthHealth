import React from 'react'
import styles from './EmployeeForm.module.css'
import DatePicker from '../DatePicker'

const DateInputField = ({ name, value, label, onChange, error }) => (
  <div className={styles.label}>
    <p>{label}</p>
    <DatePicker
      startOfWeek="mar"
      name={name}
      value={value}
      onChange={onChange}
      useIcons={true}
      language="en"
      dateFormat="DD-MM-YYYY"
      customStyles={{
        backgroundColor: 'transparent',
        borderRadius: '0',
      }}
      manualInputEnabled={false}
    />

    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)

export default DateInputField
