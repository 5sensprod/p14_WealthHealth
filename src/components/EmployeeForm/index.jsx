import React, { useState } from 'react'
import { departments } from '../../data/departments'
import styles from './EmployeeForm.module.css'
import InputField from './InputField'
import SelectField from './SelectField'
import DateInputField from './DateInputField'
import AddressFields from './AddressFields'
import { validateEmployeeForm } from './validation'
import { formattedFieldNames } from '../../utils/formatFieldNames'
import { initialEmployeeState } from '../../config/initialState'
import useFormErrors from '../../hooks/useFormErrors'
import { debounce } from '../../utils/debounce'

const EmployeeForm = () => {
  const [formData, setFormData] = useState(initialEmployeeState)
  const { errors, setError, clearError, hasErrors, validateField } =
    useFormErrors({}, formattedFieldNames)

  const debouncedValidation = debounce((name, value) => {
    const error = validateField(name, value)
    if (error) {
      setError(name, error)
    } else {
      clearError(name)
    }
  }, 300)

  const handleChange = (event) => {
    const { name, value } = event.target

    clearError(name)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    debouncedValidation(name, value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const fieldErrors = validateEmployeeForm(formData, formattedFieldNames)

    for (const field in fieldErrors) {
      setError(field, fieldErrors[field])
    }

    if (!hasErrors()) {
      console.log(formData)
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

        <DateInputField
          name="dateOfBirth"
          label="Date of Birth"
          type="text"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />

        <DateInputField
          name="startDate"
          label="Start Date"
          type="text"
          value={formData.startDate}
          onChange={handleChange}
          error={errors.startDate}
        />

        <AddressFields
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />

        <SelectField
          name="department"
          label="Department"
          value={formData.department}
          onChange={handleChange}
          options={[
            { value: '', label: 'Please select a department' }, // Option de placeholder
            ...departments.map((department) => ({
              value: department,
              label: department,
            })),
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
