import React from 'react'
import styles from './EmployeeForm.module.css'
// import DatePicker from '@5sensprod/react-custom-datepicker'
import DatePicker from '../DatePicker'

const DateInputField = ({ name, value, label, onChange, className, error }) => {
  return (
    <div className={`${styles.label} ${className}`}>
      <label htmlFor={`${name}DateInput`}>{label}</label>
      <DatePicker
        placeholderText=""
        showButton={false}
        id={`${name}DateInput`}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        designType={'default'}
        yearBlockSize={16}
        useIcons={true}
        startOfWeek={0}
        language="fr"
        // dateFormat="ISO"
        manualInputEnabled={true}
        minYear={'auto-10'}
        maxYear={2030}
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
