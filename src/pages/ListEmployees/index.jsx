import React from 'react'
import EmployeeTable from '../../components/EmployeeTable'
import styles from './Employees.module.css'
import employeeMock from '../../data/employeeMock'

const Employees = () => (
  <main className={`${styles.main} ${styles.bgDark}`}>
    <h1 className={styles.title}>Current Employees</h1>
    <EmployeeTable data={employeeMock} />
  </main>
)

export default Employees
