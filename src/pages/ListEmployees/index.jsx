import React from 'react'
import EmployeeTable from '../../components/EmployeeTable'
import styles from './Employees.module.css'
import employeeMock from '../../data/employeeMock'

/**
 * Composant représentant la page des employés actuels.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX représentant la liste des employés.
 */
const Employees = () => (
  <main className={`${styles.main} ${styles.bgDark}`}>
    <h1 className={styles.title}>Employees list</h1>
    <EmployeeTable data={employeeMock} />
  </main>
)

export default Employees
