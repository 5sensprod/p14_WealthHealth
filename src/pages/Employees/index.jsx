import React from 'react'
import EmployeeTable from '../../components/EmployeeTable'
import employeeMock from '../../data/employeeMock' // Importez les données mockées
import styles from './Employees.module.css'

const Employees = () => (
  <main className={`${styles.main} ${styles.bgDark}`}>
    <h1 className={styles.title}>Current Employees</h1>{' '}
    <EmployeeTable data={employeeMock} />
  </main>
)

export default Employees
