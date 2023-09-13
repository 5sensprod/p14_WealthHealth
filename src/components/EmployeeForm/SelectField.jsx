/**
 * Composant qui représente un champ de sélection (dropdown) pour le formulaire d'employé.
 * Il utilise `react-select` pour créer la liste déroulante.
 *
 * @component
 * @param {string} name - Le nom du champ de sélection.
 * @param {any} value - La valeur actuellement sélectionnée.
 * @param {string} label - Le label à afficher au-dessus du champ de sélection.
 * @param {Array} options - Les options disponibles pour la sélection.
 * @param {Function} onChange - Fonction à appeler lors d'un changement de valeur.
 * @param {string} [error] - Message d'erreur éventuel à afficher.
 * @returns {React.ReactNode} - Le champ de sélection rendu avec les options et éventuellement un message d'erreur.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './EmployeeForm.module.css'

const SelectField = ({ name, value, label, options, onChange, error }) => {
  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      padding: '0',
    }),

    input: (base, state) => ({
      ...base,
      margin: '0',
      paddingBottom: '0',
      paddingTop: '0',
      color: 'transparent',
      fontSize: '10px',
    }),
    control: (base, state) => ({
      ...base,
      borderRadius: '0',
      minHeight: '22px',
      height: '23px',
      width: '171px',
      padding: '0',
      fontSize: '14px',
      color: 'red',
      border: '1px solid gray',
      '&:hover': {
        border: '1px solid #161616',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#d3d3d3' : base.backgroundColor,
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: '#b3b3b3',
      },
    }),
  }
  const DropdownIndicator = () => null
  const IndicatorSeparator = () => null

  const customComponents = {
    DropdownIndicator,
    IndicatorSeparator,
  }
  return (
    <div className={styles.label}>
      <label>
        {label}
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={options}
          styles={customStyles}
          components={customComponents}
          aria-label={label}
          name={name}
          value={options.find((option) => option.value === value)}
          onChange={(selectedOption) => {
            onChange({
              target: {
                name: name,
                value: selectedOption ? selectedOption.value : '',
              },
            })
          }}
        />
      </label>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default SelectField
