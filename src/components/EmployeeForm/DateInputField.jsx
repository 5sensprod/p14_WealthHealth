import React from 'react'
import styles from './EmployeeForm.module.css'
import DatePicker from '../DatePicker'

const DateInputField = ({ name, value, label, onChange, error }) => {
  return (
    <div className={styles.label}>
      <p>{label}</p>
      <DatePicker
        name={name}
        value={value}
        onChange={onChange}
        // useIcons={true}
        // startOfWeek="1"
        // language="fr"
        dateFormat="DEFAULT"
        // manualInputEnabled={true}
        // minYear={'auto-77'}
        // maxYear={'auto+10'}
        customStyles={{
          backgroundColor: 'transparent',
          borderRadius: '0',
        }}
      />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export default DateInputField
