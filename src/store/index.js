import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../slices/employeeSlice'

// Tente de charger les employés depuis le localStorage
const savedEmployees = localStorage.getItem('employees')
// Si savedEmployees est trouvé, il est parsé. Sinon, utilise un tableau vide.
const initialEmployees = savedEmployees ? JSON.parse(savedEmployees) : []

const preloadedState = {
  employee: {
    employees: initialEmployees,
  },
}

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  preloadedState,
})

export default store
