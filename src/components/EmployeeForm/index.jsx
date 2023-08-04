import React, { useState } from 'react'
import { departments } from '../../data/departments'
import styles from './EmployeeForm.module.css'
import InputField from './InputField'
import SelectField from './SelectField'
import DateInputField from './DateInputField'
import AddressFields from './AddressFields'
import { validateEmployeeForm } from './validation'
import { formattedFieldNames } from '../../utils/formatFieldNames'
import { formatDate } from '../../utils/formatDate'
import { initialEmployeeState } from '../../config/initialState'
import useFormErrors from '../../hooks/useFormErrors'
import useFormData from '../../hooks/useFormData'
import useDebouncedValidation from '../../hooks/useDebouncedValidation'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../slices/employeeSlice'
import ModalComponent from '../Modal'

const EmployeeForm = () => {
  const dispatch = useDispatch()

  const [formData, originalHandleChange, resetFormData] =
    useFormData(initialEmployeeState)

  const { errors, setError, clearError, validateField } = useFormErrors(
    {},
    formattedFieldNames,
  )

  const debouncedValidation = useDebouncedValidation(
    validateField,
    300,
    setError,
    clearError,
  )

  const handleChange = (event) => {
    originalHandleChange(event)

    const { name, value } = event.target
    clearError(name)
    debouncedValidation(name, value)
  }

  const [isModalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const fieldErrors = validateEmployeeForm(formData, formattedFieldNames)

    // mise à jour de l'état des erreurs
    for (const field in fieldErrors) {
      setError(field, fieldErrors[field])
    }

    // vérifier si l'objet des erreurs est vide
    if (Object.keys(fieldErrors).length === 0) {
      const processedData = {
        ...formData,
        dateOfBirth: formatDate(formData.dateOfBirth),
        startDate: formatDate(formData.startDate),
      }

      dispatch(addEmployee(processedData))
      console.log('Employé sauvegardé avec succès!')

      resetFormData()

      setModalOpen(true)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Employee</h1>
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
            { value: '', label: 'Please select a department' },
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
      <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Employee Created!</h2>
        <button onClick={closeModal}>Close</button>
      </ModalComponent>
    </div>
  )
}

export default EmployeeForm
