import React, { useState } from 'react'
import { states } from '../../data/cityCodes.js'
import styles from './EmployeeForm.module.css'

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

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label className={styles.label}>
        First Name
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>

      <label>
        Last Name
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>

      <label>
        Date of Birth
        <input
          type="text"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </label>

      <label>
        Start Date
        <input
          type="text"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </label>

      <fieldset>
        <legend>Address</legend>

        <label>
          Street
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </label>

        <label>
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>

        <label>
          State
          <select name="state" value={formData.state} onChange={handleChange}>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Zip Code
          <input
            type="number"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <label>
        Department
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
      </label>

      <button className={styles.submitButton} type="submit">
        Save
      </button>
    </form>
  )
}

export default EmployeeForm
