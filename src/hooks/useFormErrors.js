import { useState } from 'react'

const useFormErrors = (initialErrors = {}, formattedFieldNames = {}) => {
  const [errors, setErrors] = useState(initialErrors)

  const validateField = (name, value) => {
    if (!value) {
      return `${formattedFieldNames[name] || name} is required`
    }
    // Ajoutez d'autres validations
    return null
  }

  const setError = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }))
  }

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors[field]
      return newErrors
    })
  }

  const hasErrors = () => Object.keys(errors).length > 0

  return { errors, setError, clearError, hasErrors, validateField }
}

export default useFormErrors
