import React from 'react'
import styles from './Home.module.css'
import EmployeeForm from '../../components/EmployeeForm'

const Home = () => (
  <main className={styles.homeContainer}>
    <EmployeeForm />
  </main>
)

export default Home
