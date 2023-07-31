import React from 'react'
import styles from './EmployeeForm.module.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateInputField = ({ name, value, label, onChange, error }) => (
  <div className={styles.label}>
    <p>{label}</p>
    <DatePicker
      selected={value ? new Date(value) : null}
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
