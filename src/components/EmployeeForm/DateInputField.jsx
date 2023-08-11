import React from 'react'
import styles from './EmployeeForm.module.css'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from '../DatePicker'

const DateInputField = ({ name, value, label, onChange, error }) => (
  <div className={styles.label}>
    <p>{label}</p>
    <DatePicker
      value={value ? new Date(value).toISOString().split('T')[0] : ''}
      onChange={(date) =>
        onChange({
          target: {
            name: name,
            value: date,
          },
        })
      }
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)

export default DateInputField
