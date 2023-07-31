export const validateEmployeeForm = (formData, formattedFieldNames) => {
  let fieldErrors = {}

  for (let field in formData) {
    if (!formData[field]) {
      let formattedField = formattedFieldNames[field] || field
      fieldErrors[field] = `${formattedField} is required`
    }
  }

  return fieldErrors
}
