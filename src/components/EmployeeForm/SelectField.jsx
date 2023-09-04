import React from 'react'
import Select from 'react-select'
import styles from './EmployeeForm.module.css'

const SelectField = ({ name, value, label, options, onChange, error }) => {
  const customStyles = {
    // Le style ici
  }

  return (
    <div className={styles.label}>
      <label>{label}</label>
      <Select
        aria-label={label}
        name={name}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => {
          onChange({
            target: {
              name: name,
              value: selectedOption.value,
            },
          })
        }}
        options={options}
        styles={customStyles}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export default SelectField
