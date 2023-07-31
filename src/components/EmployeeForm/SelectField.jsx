import React from 'react'
import Select from 'react-select'
import styles from './EmployeeForm.module.css'

const SelectField = ({ name, value, label, options, onChange, error }) => {
  const customStyles = {
    // Le style ici
  }

  return (
    <div className={styles.label}>
      <p>{label}</p>
      <Select
        name={name}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => {
          // Création d'un faux événement pour simuler le comportement d'un événement standard
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
