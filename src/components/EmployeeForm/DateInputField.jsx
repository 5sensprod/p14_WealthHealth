import React from 'react'
import styles from './EmployeeForm.module.css'
// import DatePicker from '@5sensprod/react-custom-datepicker'
import DatePicker from '../DatePicker'

const DateInputField = ({ name, value, label, onChange, error }) => {
  return (
    <div className={styles.label}>
      <label htmlFor={`${name}DateInput`}>{label}</label>
      <DatePicker
        id={`${name}DateInput`}
        name={name}
        value={value}
        onChange={onChange}
        designType={'def'}
        yearBlockSize={16}
        useIcons="ss"
        startOfWeek="7"
        language="fl"
        dateFormat={'IS'}
        manualInputEnabled="fru"
        // minYear={'bbfg-10'}
        // maxYear={'bbfg-10'}
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
