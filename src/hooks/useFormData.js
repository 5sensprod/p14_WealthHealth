import { useState } from 'react'

const useFormData = (initialState) => {
  const [data, setData] = useState(initialState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const resetFormData = () => {
    setData(initialState)
  }

  return [data, handleChange, resetFormData]
}

export default useFormData
