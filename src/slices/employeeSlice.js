import { createSlice } from '@reduxjs/toolkit'
import employeeMock from '../data/employeeMock'

const initialState = {
  employees: employeeMock,
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    initEmployees: (state, action) => {
      state.employees = action.payload
    },
    addEmployee: (state, action) => {
      // Ajout de l'employé au state
      state.employees.push(action.payload)

      // Sauvegarde l'ensemble du tableau d'employés dans le localStorage
      localStorage.setItem('employees', JSON.stringify(state.employees))
    },
    loadFromLocalStorage: (state) => {
      const savedEmployees = JSON.parse(localStorage.getItem('employees'))
      if (savedEmployees && savedEmployees.length > 0) {
        state.employees = savedEmployees
      } else {
        state.employees = employeeMock
      }
    },
  },
})

export const { initEmployees, addEmployee, loadFromLocalStorage } =
  employeeSlice.actions
export default employeeSlice.reducer
