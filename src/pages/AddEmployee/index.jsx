import React from 'react'
import styles from './AddEmployee.module.css'
import EmployeeForm from '../../components/EmployeeForm'

const AddEmployee = () => (
  <main className={styles.homeContainer}>
    <EmployeeForm />
  </main>
)

export default AddEmployee
