import React, { useState } from 'react'
import { states } from '../../data/cityCodes.js'
import styles from './EmployeeForm.module.css'
import InputField from './InputField'
import SelectField from './SelectField'

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  })

  const [errors, setErrors] = useState({}) // Nouveau state pour la gestion des erreurs

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Ici, ajoutez une validation pour chaque champ,
    // et si un champ est vide, ajoutez une erreur correspondante dans le state "errors".
    let fieldErrors = {}

    for (let field in formData) {
      if (!formData[field]) {
        fieldErrors[field] = `${field} is required`
      }
    }

    setErrors(fieldErrors)
    console.log('Detected errors:', fieldErrors)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length === 0) {
      console.log(formData)
      // Ici, vous pouvez traiter le formData, par exemple l'envoyer à une API.
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Employee</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <InputField
          name="firstName"
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <InputField
          name="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <InputField
          name="dateOfBirth"
          label="Date of Birth"
          type="text"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />

        <InputField
          name="startDate"
          label="Start Date"
          type="text"
          value={formData.startDate}
          onChange={handleChange}
          error={errors.startDate}
        />

        <fieldset className={styles.fieldsetContainer}>
          <legend>Address</legend>

          <InputField
            name="street"
            label="Street"
            type="text"
            value={formData.street}
            onChange={handleChange}
            error={errors.street}
          />

          <InputField
            name="city"
            label="City"
            type="text"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />

          <SelectField
            name="state"
            label="State"
            value={formData.state}
            onChange={handleChange}
            options={[
              { value: '', label: 'Please select a state' }, // Option de placeholder
              ...states.map((state) => ({
                value: state.abbreviation,
                label: state.name,
              })),
            ]}
          />

          <InputField
            name="zipCode"
            label="Zip Code"
            type="number"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
          />
        </fieldset>

        <SelectField
          name="department"
          label="Department"
          value={formData.department}
          onChange={handleChange}
          options={[
            { value: '', label: 'Please select a department' }, // Option de placeholder
            { value: 'Sales', label: 'Sales' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Engineering', label: 'Engineering' },
            { value: 'Human Resources', label: 'Human Resources' },
            { value: 'Legal', label: 'Legal' },
          ]}
        />

        <button className={styles.submitButton} type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default EmployeeForm
