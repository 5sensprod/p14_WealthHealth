import React from 'react'
import styles from './EmployeeForm.module.css'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from '../DatePicker'

const DateInputField = ({ name, value, label, onChange, error }) => (
  <div className={styles.label}>
    <p>{label}</p>
    <DatePicker
      name={name}
      value={value}
      onChange={onChange}
      useIcons={true}
      language="en"
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)

export default DateInputField
