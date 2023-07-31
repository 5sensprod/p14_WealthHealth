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
        // Recherche et renvoie l'objet correspondant à la valeur actuelle
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => {
          // Création d'un faux événement pour simuler le comportement d'un événement standard
          // d'un élément de formulaire HTML. Cela permet d'utiliser le même gestionnaire
          // "onChange" que pour les autres champs de formulaire.
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
